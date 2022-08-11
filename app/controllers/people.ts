import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ExitStatus } from 'typescript';
import 'dotenv/config'

interface People {
    name: String;
    email: String;
    age: Number;
}


const getPeople = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/people`);
    let people: [People] = result.data;
    return res.status(200).json({
        people
    });
};

const getPerson = async (req: Request, res: Response, next: NextFunction) => {    
    let id: string = req.params.id;

    try {
        let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/people/${id}`);
        let person: People = result.data;
    
        return res.status(200).json({
            person
        }); 
    } catch (err) {
        return res.status(404).send('Not found');
    }
};

const getPersonsPets = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    try {
        let personExists = await axios.get(`${process.env.DB_URL}/people/${id}`);
        if (personExists.data) {
            let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/pets?person_id=${id}`);
            let pets = result.data;
            return res.status(200).json({
                pets
            });    
        }
    } catch (err) {
        return res.status(404).send('Not found');
    }

};

const createPerson = async (req: Request, res: Response, next: NextFunction) => {
    let person: People = req.body;
    if(!Object.keys(req.body).length || !req.body.name || !req.body.email || !req.body.age) {
        return res.status(400).send('Please add all the details');
    }
    try {
        let result: AxiosResponse = await axios.post(`${process.env.DB_URL}/people`, person);
        return res.status(201).json({
            person: result.data
        });
    } catch (err) {
        return res.status(500).send('Something went wrong');
    }
}

const updatePerson = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    if(!Object.keys(req.body).length) {
        return res.status(400).send('Please add at leat one field to update');
    }
    try {
        //check if type is number
        if (req.body.age) {
            if (isNaN(req.body.age)) {
                //NaN returns numbers even if it's a string, we can fix it here
                req.body.age = parseInt(req.body.age);
                return res.status(400).send('Age must be a number');
            }
        }
        if (req.body.name) {
            if (typeof req.body.name !== 'string') {
                return res.status(400).send('Name must be a string');
            }
        }
        if (req.body.email) {
            if (typeof req.body.email !== 'string') {
                return res.status(400).send('Email must be a string');
            }
        }

        //next lines are not optimal but I had to do it else it was just replacing the values and not updating.
        //a normal database wouldn't work like this 
        let result: AxiosResponse = await axios.get(`${process.env.DB_URL}/people/${id}`);
        let people: People = result.data;
    
        let age: number = req.body.age ?? people.age;
        let name: string = req.body.name ?? people.name;
        let email: string = req.body.email ?? people.email;
        // update the post
        let response: AxiosResponse = await axios.put(`${process.env.DB_URL}/people/${id}`, {
            ...(age && { age }),
            ...(name && { name }),
            ...(email && { email })
        });
        // return response
        return res.status(200).json({
            person: response.data
        });
    } catch (err) {
        return res.status(404).send('Something went wrong or person doesn\'t exist');
    }
}

const deletePerson = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    try {
        let personToDelete: AxiosResponse = await axios.get(`${process.env.DB_URL}/people/${id}`);
        let personToDeleteData: People = personToDelete.data;
    
    
        let result: AxiosResponse = await axios.delete(`${process.env.DB_URL}/people/${id}`);
        return res.status(200).json({
            person: personToDeleteData
        });
    } catch (err) {
        return res.status(404).send('Something went wrong or person doesn\'t exist');
    }
}

export default { getPeople, getPerson, getPersonsPets, createPerson, updatePerson, deletePerson };