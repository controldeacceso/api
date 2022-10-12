"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFID_PUT_BODY_SCHEMA = exports.InOutType = exports.Schema = void 0;
var Schema;
(function (Schema) {
    Schema.validate = (schema, data) => {
        if (schema.required) {
            for (const field of schema.required) {
                if (data[field] === undefined)
                    return false;
            }
        }
        for (const field in schema.fields) {
            if (data[field] !== undefined) {
                if (typeof data[field] !== schema.fields[field])
                    return false;
            }
        }
        return true;
    };
})(Schema = exports.Schema || (exports.Schema = {}));
var InOutType;
(function (InOutType) {
    InOutType[InOutType["IN"] = 0] = "IN";
    InOutType[InOutType["OUT"] = 1] = "OUT";
})(InOutType = exports.InOutType || (exports.InOutType = {}));
exports.RFID_PUT_BODY_SCHEMA = {
    fields: {
        rfid: 'string'
    },
    required: ['rfid']
};
//# sourceMappingURL=typing.js.map