import mongoose, { Schema, model, Document } from 'mongoose';

interface ICustomer {
  name: string;
  email: string;
  password: string;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
  },
  password: { type: String, required: true, minlength: 6 },
});

const Customer = model('Customer', CustomerSchema);

export default Customer;
