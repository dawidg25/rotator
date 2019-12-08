module.exports = {
    apiErrorResponse(error) {
        console.log(error);
        let ret = {
            status: 500,
            errors: {}
        }
        Object.keys(error.errors).forEach(key => {
            ret.errors[key] = error.errors[key].message;
        })
        return ret;
    },
    apiDocumentCreated(doc) {
        return {
            status: 200,
            document: doc
        }
    },
    apiDocumentUpdated(doc) {
        return {
            status: 200,
            document: doc
        }
    },
    apiDocumentRemoved(doc) {
        return {
            status: 200,
            document: doc
        }
    }
}