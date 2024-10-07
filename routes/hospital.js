const express = require("express");
const router = express.Router();
const fs =require('fs');

const load = () => {
    try{
        const dataBuffer = fs.readFileSync('hospitals.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(error){
        console.log(error);
    }
}

const save = (hospital) => {
    try{
        const dataJSON = JSON.stringify(hospital, null, 2);
        fs.writeFileSync('hospitals.json', dataJSON);
    }
    catch(error){
        console.log(error);
    }
}

router.get('/', (req, res) => {
    const hospital = load();
    res.send(hospital);
})

router.post('/', (req, res) => {
    try{
    const hospital = load();
    const newhospital = {
        id:hospital.length + 1,
        name:req.body.name,
        location:req.body.location,
        patients:req.body.patients || []
    }
    hospital.push(newhospital);
    save(hospital);
    res.send(newhospital);
    }
    catch(error){
        res.send(error);
    }
})

router.put('/:id', (req, res) => {
    try{
        const hospital =  load();
        const editHospital = hospital.find(i => i.id === parseInt(req.params.id));

        if(!editHospital){
            return res.send('Hospital not found');
        }
        editHospital.name = req.body.name || editHospital.name;
        editHospital.location = req.body.location || editHospital.location;
        editHospital.patients = req.body.patients || editHospital.patients;
        save(hospital);
        res.send(editHospital);
    }
    catch(error){
        res.send(error);
    }
})

router.delete('/:id', (req, res) => {
    try{
        const hospital = load();
        const index = hospital.findIndex(i => i.id === parseInt(req.params.id));
        if(index === -1){
            return res.send('Hospital not found');
        }
        hospital.splice(index, 1);
        save(hospital);
        res.send({message: 'Hospital details are deleted'});
    }
    catch(error){
        res.send(error);
    }
})
module.exports = router;