const model = require('./models')

async function get(tabla,id=null){
    if(!model[tabla]){
        return {
            error: true, 
            body: 'la tabla no existe'
        }
    }

    try{
        if(id){        
            let getDato = await model[tabla].find(id)
            return {
                error: false , 
                body: getDato
            }
        }else{
            let getDato = await model[tabla].find()
            return {
                error: false , 
                body: getDato
            }
        }
    }
    catch (err){
        return {
            error: true , 
            body: err
        }
    }
}

async function post(tabla,data){
    if(!model[tabla]){
        return {
            error: true , 
            body: 'la tabla no existe'
        }
    }

    try{
        let newModel = new model[tabla](data)
        await newModel.save()
        return {
            error: false , 
            body: newModel
        }
    }
    catch (err){
        return {
            error: true , 
            body: err
        }
    }
}

async function put(tabla, id,data){
    if(!model[tabla]){
        return {
            error: true , 
            body: 'la tabla no existe'
        }
    }

    try{
        // console.log(tabla, id);
        let getDato = await model[tabla].find(id)
        // console.log(getDato);
        if(getDato[0]){
            let keys = Object.keys(data)
            keys.map((e)=>{
                getDato[0][e] = data[e]
            })
            // console.log(getDato, await model[tabla].find(id));
            await getDato[0].save()
            return {
                error: false , 
                body: getDato
            }
        }else{
            return {
                error: true , 
                body: 'no existe / no encontrado'
            }
        }
    }
    catch (err){
        return {
            error: true , 
            body: err
        }
    }
}

async function delt(tabla,id){
    if(!model[tabla]){
        return {
            error: true , 
            body: 'la tabla no existe'
        }
    }

        return model[tabla].deleteOne(id,()=>{
            return{
                error: false,
                body: 'dato eliminado'
            }
        }) 
}

module.exports={
    get,
    post,
    put,
    delt,
}