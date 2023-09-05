import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ICustomer extends IUser {
  profilePic?: string;
}

interface ICustomerDocument extends ICustomer, Document {}
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
  profilePic: { type: String },
});

const Customer = model<ICustomerDocument>('Customer', CustomerSchema);

export { IUser, ICustomer, Customer };
