import mongoose, { Schema } from 'mongoose';


const basePlugin = (schema) => {
    schema.add({
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    });

    schema.pre('save', function (next) {
        this.updatedAt = Date.now();
        next();
    });
};

class BaseModel {
    constructor(modelName, schemaDefinition) {
        this.schema = new Schema(schemaDefinition);
        this.schema.plugin(basePlugin);

        this.model = mongoose.model(modelName, this.schema);
    }

    async create(data) {
        data = this.sanitiseData(data);

        try {
            const doc = new this.model(data);
            return await doc.save();
        } catch (error) {
            console.error('Error creating document:', error);
            throw new Error('Failed to create document');
        }
    }

    sanitiseData(data) {
        delete data['_id'];
        delete data['id'];
        delete data['createdAt'];
        delete data['updatedAt'];

        return data;
    }
}

export default BaseModel;