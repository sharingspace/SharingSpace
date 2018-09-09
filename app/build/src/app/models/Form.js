var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, action, toJS } from 'mobx';
import Validator from 'validatorjs';
var Form = (function () {
    function Form(formTemplate, formData, call) {
        var _this = this;
        this.fields = new Map();
        this.submitErrors = {};
        this.changeData = function (key, value, index) {
            _this.fields.get(key).setVal(value, index);
        };
        this.fieldSet = function (fieldSet) {
            if (fieldSet) {
                var fields_1 = [];
                fieldSet.forEach(function (field) {
                    var thisField = _this.fields.get(field.uuid);
                    fields_1.push(thisField);
                });
                return fields_1;
            }
            return _this.fields.values();
        };
        this.clearErrors = function () {
            _this.fields.forEach(function (field) {
                field.setErrors(null);
            });
        };
        this.validate = function () {
            var data = {};
            var rules = {};
            _this.fields.forEach(function (field) {
                if (field.multi) {
                    field.value.forEach(function (value, i) {
                        data[field.uuid + '.' + i.toString()] = value;
                        rules[field.uuid + '.' + i.toString()] = field.rules;
                    });
                }
                else {
                    data[field.uuid] = field.value;
                    rules[field.uuid] = field.rules;
                }
            });
            _this.clearErrors();
            var valid = new Validator(data, rules, { required: 'This field is required' });
            if (valid.fails()) {
                Object.entries(valid.errors.errors).forEach(function (error) {
                    console.log(error);
                    var id = error[0].split('.');
                    _this.fields.get(id[0]).setErrors(error[1], id[1]);
                });
                return false;
            }
            return true;
        };
        this.submit = function () {
            var params = {};
            _this.fields.forEach(function (field) {
                params[field.uuid] = toJS(field.value);
            });
            return new Promise(function (resolve, reject) {
                _this.apiCall(params).then(function (res) {
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };
        this.apiCall = call;
        formTemplate.forEach(function (field) {
            field.overwriteVal(formData[field.uuid] || '');
            _this.fields.set(field.uuid, field);
        });
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], Form.prototype, "fields", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], Form.prototype, "submitErrors", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Form.prototype, "changeData", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Form.prototype, "fieldSet", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Form.prototype, "clearErrors", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Form.prototype, "validate", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Form.prototype, "submit", void 0);
    return Form;
}());
export default Form;
//# sourceMappingURL=Form.js.map