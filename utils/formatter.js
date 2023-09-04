const dayjs = require('dayjs')

function formatter (date) {
    return dayjs(date).format('DD/MM/YYYY')
}

module.exports = formatter