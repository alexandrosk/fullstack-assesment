import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import 'dotenv/config'

interface Pets {
    person_id?: Number;
    name: String;
    species: String;
    age: Number;
}


const getPets = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/pets`);
    let pets: [Pets] = result.data;
    return res.status(200).json({
        pets
    });
};

const getPet = async (req: Request, res: Response, next: NextFunction) => {    
    let id: string = req.params.id;

    try {
        let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/pets/${id}`);
        let pet: Pets = result.data;
        return res.status(200).json({
            pet
        }); 
    } catch (err) {
        return res.status(404).send('Not found');
    }
    
};


const createPet = async (req: Request, res: Response, next: NextFunction) => {
    let pet: Pets = req.body;
    if(!Object.keys(req.body).length || !req.body.person_id || !req.body.age || !req.body.name || !req.body.species) {
        return res.status(400).send('Please add all the details');
    }
    //check if person exists, because json-server returns 404 I need to catch this.
    try {
        let personFound = await axios.get(`${process.env.DB_URL}/people/${pet.person_id}`);
    } catch {
        return res.status(404).send('Person not found');
    }


    try {
        let result: AxiosResponse = await axios.post(`${process.env.DB_URL}/pets`, pet);
        return res.status(201).json({
            pet: result.data
        });
    } catch (err) {
        return res.status(500).send('Something went wrong');
    }
}

const updatePets = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;

    if(!Object.keys(req.body).length) {
        return res.status(400).send('Please add at leat one field to update');
    }
    try {
        //check if type is number
        if (req.body.person_id) {
            return res.status(404).send('Forbidden, you cannot change the owner of the pet');
        }
        if (req.body.name) {
            if (typeof req.body.name !== 'string') {
                return res.status(400).send('Name must be a string');
            }
        }
        if (req.body.species) {
            if (typeof req.body.species !== 'string') {
                return res.status(400).send('Email must be a string');
            }
        }
        if (req.body.age) {
            if (isNaN(req.body.age)) {
                req.body.age = parseInt(req.body.age);
                return res.status(400).send('Age must be a number');
            }
        }
        //next lines are not optimal but I had to do it else it was just replacing the values and not updating.
        //a normal database wouldn't work like this 
        let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/pets/${id}`);
        let pet: Pets = result.data;
        let age: number = req.body.age ?? pet.age;
        let name: string = req.body.name ?? pet.name;
        let species: string = req.body.species ?? pet.species;
      
        
        let response: AxiosResponse = await axios.put(`${process.env.DB_URL}/pets/${id}`, {
            age: age,
            name: name,
            species: species,
            person_id: pet.person_id
        });
        // return response
        return res.status(200).json({
            pet: response.data
        });
    } catch (err) {
        return res.status(404).send('Something went wrong or pet doesn\'t exist');
    }
}

const deletePets = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    try {
        let petToDelete: AxiosResponse = await axios.get(`${process.env.DB_URL}/pets/${id}`);
        let petToDeleteData: Pets = petToDelete.data;
    
    
        let result: AxiosResponse = await axios.delete(`${process.env.DB_URL}/get/${id}`);
        return res.status(200).json({
            pet: petToDeleteData
        });
    } catch (err) {
        return res.status(404).send('Something went wrong or person doesn\'t exist');
    }
}


export default { getPets, getPet, createPet, updatePets};