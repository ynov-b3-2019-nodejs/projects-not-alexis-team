module.exports = (app,db) =>{
    app.use((req,res) => {
        res.render('chat');
    })
};