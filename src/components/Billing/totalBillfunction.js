export const totalBill = (lineItems) => {
    let total = 0
    lineItems.forEach((item) => {
      total += (item.price * item.quantity)
    })
    return total
}