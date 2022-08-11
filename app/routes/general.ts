
import express from 'express';
import PeopleController from '../controllers/people';
import PetsController from '../controllers/pets';
const router = express.Router();

router.get('/people', PeopleController.getPeople);
router.get('/people/:id', PeopleController.getPerson);
router.get('/people/:id/pets', PeopleController.getPersonsPets);
router.get('/pets', PetsController.getPets);
router.get('/pets/:id', PetsController.getPet);

router.post('/people', PeopleController.createPerson);
router.post('/pets', PetsController.createPet);

router.put('/people/:id', PeopleController.updatePerson);
router.put('/pets/:id', PetsController.updatePets);

router.delete('/people/:id', PeopleController.deletePerson);
//router.delete('/pets/:id', PetsController.deletePet);


export = router;
