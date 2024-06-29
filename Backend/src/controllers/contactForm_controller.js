import FormData from '../models/contactForm_model.js'





export const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;
    const formData = new FormData({ name, email, subject, message });

    try {
        await formData.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const readContactForm = async (req, res) => {
    try {
        const formData = await FormData.find();
        res.json(formData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}