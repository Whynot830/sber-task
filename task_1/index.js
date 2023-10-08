import { encoded, translations } from './data.js'

console.log("Let's rock")
// console.log(encoded, translations)

const idSet = new Set()
const decoded = encoded.map(obj => {
    let res = {}
    let excluded_fields = ['groupId', 'service', 'formatSize', 'ca']
    for (let field in obj) {
        if (field.match(/Id$/) && !excluded_fields.includes(field) && translations.hasOwnProperty(obj[field]))
            res[field] = translations[obj[field]]

        else res[field] = obj[field] 

        if (!(translations.hasOwnProperty(obj[field])) && !isNaN(parseInt(obj[field]))) 
            idSet.add(obj[field])
    }
    return res
})
console.log(decoded)
console.log(idSet)