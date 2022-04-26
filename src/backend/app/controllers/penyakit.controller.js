import { penyakit, Sequelize } from "../models";
const Penyakit = penyakit;
const Op = Sequelize.Op;
// Create and Save a new penyakit
export function create(req, res) {
  
}
// Retrieve all penyakits from the database.
export function findAll(req, res) {
  
}
// Find a single penyakit with an id
export function findOne(req, res) {
  
}
// Update a penyakit by the id in the request
export function update(req, res) {
  
}
// Delete a penyakit with the specified id in the request
const _delete = (req, res) => {
};
export { _delete as delete };
// Delete all penyakits from the database.
export function deleteAll(req, res) {
  
}
// Find all published penyakits
export function findAllPublished(req, res) {
  
}