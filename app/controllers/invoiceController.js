








let mysql=require('../../db/mysql');
let invoice=require('../models/invoice');
module.exports = {
   create:(req,res)=>{
      //{date, total, amount, products[id_product, quantity, cost]}
      console.log(req.body);
      let rfc=req.body.rfc;
      let total=req.body.total;
      let tax=req.body.tax;
      let productos=req.body.detalles;
      mysql.query('insert into invoice (date,payment,tax,customer_rfc)values(?,?,?,?)'
      ,['2021/05/26',total,tax,rfc],(err,rows,fields)=>{
         if(!err){
            console.log('Se inserto el' , rows.insertId)
            productos.forEach(prod => {
               mysql.query('insert into invoice_details(invoice_id,product_id,quantity,costo)values(?,?,?,?)'
               [rows.insertId,prod.id,prod.quantity,prod.cost],(err,rows,fields)=>{
               if (err)
                  res.json(err);
            })
         });
            res.json({status:'ok',mensaje:'Se inserto la factura',folio:rows.insertId})
         }
         else
            res.json(err);
      })

      //res.json({texto:'mensaje'});
      /*mysql.query('insert into order SET ?',req.body,(err,rows,fields)=>{
         if(!err)
            res.json(rows);
         else
            res.json(err);
      })*/
   },
   list:(req,res)=>{
      mysql.query('select * from order',(err,rows,fields)=>{
         if (!err)
            res.json(rows);
         else
            res.json(err);
      })
   },
   find:(req,res)=>{
      mysql.query('select * from order o inner join order_details d on o.id=d.order_id where o.id=?',req.params.id,(err,rows,fields)=>{
         if (!err)
            res.json(rows);
         else
            res.json(err);
      })
   }
}
