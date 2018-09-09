var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Form from './Form';
import { observable, action } from 'mobx';
var Case = (function () {
    function Case(caseObj) {
        var other_data = caseObj.other_data, attorney = caseObj.attorney;
        delete caseObj.other_data;
        delete caseObj.attorney;
        Object.assign(this, caseObj);
        Object.assign(this, other_data);
        this.attorneyName = attorney;
    }
    return Case;
}());
var FormID = (function () {
    function FormID(form) {
        Object.assign(this, form);
    }
    return FormID;
}());
var WildForm = (function () {
    function WildForm(form) {
        Object.assign(this, form);
    }
    return WildForm;
}());
var Section = (function () {
    function Section(section) {
        Object.assign(this, section);
    }
    return Section;
}());
var QuestionGroup = (function () {
    function QuestionGroup(qGroup) {
        Object.assign(this, qGroup);
    }
    return QuestionGroup;
}());
var Question = (function () {
    function Question(question) {
        Object.assign(this, question);
    }
    return Question;
}());
var ruleTypes = {
    STR: 'string',
    EMAIL: 'email|string',
    PWD: 'string',
    DATE: 'date',
    LONGSTR: 'string',
    BOOL: 'boolean',
    INT: 'integer',
    URL: 'url',
    LIST_STR: 'string',
    DATE_RANGE: 'array',
};
var inputTypes = {
    STR: 'text',
    EMAIL: 'text',
    PWD: 'password',
    DATE: 'date',
    LONGSTR: 'textarea',
    BOOL: 'checkbox',
    INT: 'number',
    URL: 'text',
    LIST_STR: 'text',
    DATE_RANGE: 'date_range',
};
var rulesStr = function (required, type) {
    var newString = ruleTypes[type];
    if (!newString) {
        console.warn('unknown field type', type);
        newString = 'string';
    }
    if (required) {
        newString = newString + "|required";
    }
    return newString;
};
var Field = (function () {
    function Field(field, multi) {
        var _this = this;
        this.setErrors = function (errors, index) {
            if (_this.multi) {
                if (errors === null) {
                    _this.errors.forEach(function (err, i, array) {
                        array[i] = null;
                    });
                }
                _this.errors[index] = observable(errors);
            }
            else {
                _this.errors = errors;
            }
        };
        this.setVal = function (val, index) {
            if (_this.multi) {
                _this.value[index] = val;
            }
            else {
                _this.value = val;
            }
        };
        this.overwriteVal = function (val) {
            if (_this.multi && !val) {
                _this.value = [''];
                _this.errors = [''];
            }
            else if (_this.multi) {
                _this.value = val;
                _this.errors = [];
                val.forEach(function (value) {
                    _this.errors.push('');
                });
            }
            else {
                _this.value = val;
            }
        };
        this.addVal = function () {
            if (_this.multi) {
                _this.value.push('');
                _this.errors.push('');
            }
        };
        this.removeVal = function (index) {
            if (_this.multi) {
                _this.value.splice(index, 1);
                _this.errors.splice(index, 1);
            }
        };
        var paramMapper = {};
        Object.assign(paramMapper, field);
        paramMapper.rules = rulesStr(field.required, field.type);
        delete paramMapper.required;
        paramMapper.type = inputTypes[paramMapper.type] || 'text';
        Object.assign(this, paramMapper);
        this.multi = multi;
        if (multi) {
            this.value = [''];
            this.errors = [''];
        }
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], Field.prototype, "value", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], Field.prototype, "errors", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Field.prototype, "setErrors", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Field.prototype, "setVal", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Field.prototype, "overwriteVal", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Field.prototype, "addVal", void 0);
    __decorate([
        action,
        __metadata("design:type", Object)
    ], Field.prototype, "removeVal", void 0);
    return Field;
}());
export { Form, FormID, Case, Section, QuestionGroup, Question, Field, WildForm, };
//# sourceMappingURL=index.js.map