import client from'../database';

export type Part {
  partID: Number;
  name: String;
  car_model: String;
  price: Number;
}

export class
  sparepart
{
  // list all spare parts
  async index() : Promise<Part[]>
  {
    try {
      const conn    = await client.connect();
      const sql     = "SELECT * FROM spare_parts";
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
      
    } catch (error) {
      throw new Error(`Cannot get Spare Parts: ${error}`);
    }
  }

  // list spare part with a specific part ID
  async show(partID : String) : Promise<Part>
  {
    try {
      const conn    = await client.connect();
      const sql     = "SELECT * FROM spare_parts WHERE partID = ($1)";
      const results = await conn.query(sql,[partID]);
      conn.release();
      return results.rows[0];
      
    } catch (error) {
      throw new Error(`Cannot find part with ID ${partID}: ${error}`);
    }
  }

  // Add new spare part item
  async create(part : Part) : Promise<Part>
  {
    try {
      const conn    = await client.connect();
      const sql     = "INSERT INTO spare_parts  (name, care_model, price) VALUES ($1, $2, $3) RETURNS *";
      const results = await conn.query(sql, [part.name, part.car_model, part.price]);
      conn.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Cannot Add new part: ${error}`);
    }
  }

  // delete spare part with specific ID
  async delete(partID : String) : Promise<Part>
  {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM spare_parts WHERE partID = ($1)";
      const results = await conn.query(sql, [partID]);
      conn.release();
      return results.rows[0];
      
    } catch (error) {
      throw new Error(`Cannot delete part with ID = ${partID}: ${error}`);
    }
  }

  async update(partID : String, price : Number) : Promise<Part>
  {
    try {
      const conn = await client.connect();
      const sql = "UPDATE spare_parts SET price = ($1) WHERE partID = ($2)";
      const results = await conn.query(sql, [price, partID]);
      conn.release();
      return results.rows[0];
    } catch (error) {
      throw new Error(`Cannot Update part with id = ${partID} price: ${error}`);
    }
  }
}