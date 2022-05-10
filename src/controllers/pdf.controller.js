const PDFGenerator = require('pdfkit')
const fs = require('fs')
const Equipo = require('../models/equipo.model')



class InvoiceGenerator {
    constructor(invoice) {
        this.invoice = new invoice
    }

    generateHeaders(doc) {
        const billingAddress = this.invoice.addresses.billing

        doc
            .fontSize(20)
            .text('INVOICE', 275, 50, {align: 'right'})
            .fontSize(10)
            .text(`Invoice Number: ${this.invoice.invoiceNumber}`, {align: 'right'})
            .text(`Due: ${this.invoice.dueDate}`, {align: 'right'})
            .text(`Balance Due: $${this.invoice.subtotal - this.invoice.paid}`, {align: 'right'})
            .moveDown()
            .text(`Billing Address:\n ${billingAddress.name}\n${billingAddress.address}\n${billingAddress.city}\n${billingAddress.state},${billingAddress.country}, ${billingAddress.postalCode}`, {align: 'right'})
    
        const beginningOfPage = 50
        const endOfPage = 550

        doc.moveTo(beginningOfPage,200)
            .lineTo(endOfPage,200)
            .stroke()
                
        doc.text(`Memo: ${this.invoice.memo || 'N/A'}`, 50, 210)

        doc.moveTo(beginningOfPage,250)
            .lineTo(endOfPage,250)
            .stroke()

    }

    generateTable(doc) {
        const tableTop = 270
        const itemCodeX = 50


        doc
            .fontSize(10)
            .text(Equipo.nombre, itemCodeX, tableTop, {bold: true})

        const items = this.invoice.items
        let i = 0


        for (i = 0; i < items.length; i++) {
            const item = items[i]
            const y = tableTop + 25 + (i * 25)

            doc
                .fontSize(10)
                .text(item.Equipo.nombre, itemCodeX, y)
        }
    }


    generate() {
        let theOutput = new PDFGenerator 

        console.log(this.invoice)

        const fileName = `Reporte.pdf`

        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream(fileName))

        this.generateHeaders(theOutput)

        theOutput.moveDown()

        this.generateTable(theOutput)

        this.generateFooter(theOutput)
        

        // write out file
        theOutput.end()

    }
}

module.exports = {InvoiceGenerator}
