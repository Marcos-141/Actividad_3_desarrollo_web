const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       required:
 *         - company
 *         - title
 *         - startDate
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado de MongoDB
 *         company:
 *           type: string
 *           description: Nombre de la empresa o institución
 *         title:
 *           type: string
 *           description: Cargo o rol desempeñado
 *         startDate:
 *           type: string
 *           description: Fecha de inicio
 *         endDate:
 *           type: string
 *           description: Fecha de finalización o 'Presente'
 *         description:
 *           type: string
 *           description: Descripción detallada de las responsabilidades
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de tecnologías utilizadas
 *       example:
 *         company: Mercado Libre
 *         title: Desarrollador Backend Node.js
 *         startDate: Enero 2024
 *         endDate: Presente
 *         description: Desarrollo y optimización de microservicios e integración de APIs REST.
 *         technologies: ["Node.js", "Express", "MongoDB", "Docker"]
 */

/**
 * @swagger
 * /experiences:
 *   get:
 *     summary: Obtener todas las experiencias profesionales
 *     tags: [Experiencias]
 *     responses:
 *       200:
 *         description: Lista devuelta exitosamente
 */
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: experiences.length, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al consultar experiencias', error: error.message });
    }
});

/**
 * @swagger
 * /experiences/{id}:
 *   get:
 *     summary: Obtener una experiencia por su ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la experiencia
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ success: false, message: 'Experiencia no encontrada' });
        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en la solicitud', error: error.message });
    }
});

/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Crear una nueva experiencia profesional
 *     tags: [Experiencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       201:
 *         description: Experiencia creada exitosamente
 */
router.post('/', async (req, res) => {
    try {
        const newExperience = await Experience.create(req.body);
        res.status(201).json({ success: true, message: 'Experiencia creada con éxito', data: newExperience });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al registrar experiencia', error: error.message });
    }
});

/**
 * @swagger
 * /experiences/{id}:
 *   put:
 *     summary: Actualizar una experiencia existente por ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la experiencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedExperience) return res.status(404).json({ success: false, message: 'Experiencia no encontrada' });
        res.status(200).json({ success: true, message: 'Experiencia actualizada con éxito', data: updatedExperience });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar', error: error.message });
    }
});

/**
 * @swagger
 * /experiences/{id}:
 *   delete:
 *     summary: Eliminar una experiencia por ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la experiencia a eliminar
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
        if (!deletedExperience) return res.status(404).json({ success: false, message: 'Experiencia no encontrada' });
        res.status(200).json({ success: true, message: 'Experiencia eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar registro', error: error.message });
    }
});

module.exports = router;