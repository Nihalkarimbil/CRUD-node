function getReqData(req){
    return new Promise((resolve,reject)=>{
        try {
            let body ='';
            req.on('data',chunk=>{
                body += chunk.toString()
            })
            req.on('end',()=>{
                const contentType = req.headers['content-type'];
                
                if (contentType && contentType.includes('application/json')) {
                    try {
                        body = JSON.parse(body);
                    } catch (error) {
                        return reject(new Error('Invalid JSON'));
                    }
                }
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports= {getReqData};
