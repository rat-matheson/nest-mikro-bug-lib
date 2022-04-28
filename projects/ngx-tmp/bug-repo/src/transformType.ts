import { Type } from "@mikro-orm/core";

export class TransformType<JsType = any, DbType = any> extends Type<JsType, DbType> {
    public static newTransform<JsType1 = any, DbType1 = any>(options: {
        toDbValue?:(value:JsType1) => DbType1,
        toJsValue?:(value:DbType1) => JsType1,
    }):TransformType<JsType1, DbType1> {
        let tt = new TransformType<JsType1, DbType1>();
        tt.options = options;
        return tt;
    }

    private options: {
            toDbValue?:(value:JsType) => DbType,
            toJsValue?:(value:DbType) => JsType,
        } = {};
    // constructor(private options: {
    //     toDbValue?:(value:JsType) => DbType,
    //     toJsValue?:(value:DbType) => JsType,
    // }) { 
    //     super();

    //     // Set the prototype explicitly.
    //     Object.setPrototypeOf(this, TransformType.prototype);
    // }

    override convertToDatabaseValue(value:JsType): DbType {
        if (this.options.toDbValue) {
            return this.options.toDbValue(value);
        }

        return <any>value;
    }
  
    override convertToJSValue(value: DbType): JsType {
        if (this.options.toJsValue) {
            return this.options.toJsValue(value);
        }

        return <any>value;
    }
}