module.exports = {
    apiErrorResponse(error) {
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
    }
}