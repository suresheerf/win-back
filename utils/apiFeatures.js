class APIfeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter(){
        const queryObj = { ...this.queryString };
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el=> delete queryObj[el]);
        
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);

        this.query =  this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ');
             this.query= this.query.sort(sortby);
         }else{
             this.query = this.query.sort('name');
         }

         return this;
    }
    feildslimit(){
        if(this.queryString.fields){
            
            const limitby = this.queryString.fields.split(',').join(' ');
            
             this.query= this.query.select(limitby);
         }
         else{
             this.query = this.query.select('-__v');
         }

         return this;
    }
    paginate(){
        const page = this.queryString.page*1 || 1;
         const limit = this.queryString.limit*1 || 10;
         const skip = (page-1)*limit;
         
         this.query = this.query.skip(skip).limit(limit);

         return this;
    }

}

module.exports = APIfeatures;