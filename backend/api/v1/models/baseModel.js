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
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data provided for creating the document');
        }

        data = this.sanitiseData(data);

        try {
            const doc = new this.model(data);
            return await doc.save();
        } catch (error) {
            console.error('Error creating document:', error);
            throw new Error('Failed to create document');
        }
    }
    
    async findAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw new Error('Failed to fetch documents');
        }
    }

    async findById(id) {
        if (!id) {
            throw new Error('Id is required to find the item');
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        try {
            return await this.model.findById(id);
        } catch (error) {
            console.error('Error fetching document by ID:', error);
            throw new Error('Failed to fetch document');
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