import Badge from "../models/badge_model.js";

export const createBadge = async (req, res) => {
    try {
        const { name } = req.body;
        const badge = new Badge({ name });
        await badge.save();
        res.status(201).json({ message: 'Badge created successfully', badge });
    } catch (error) {
        res.status(500).json({ message: 'Error creating badge', error: error.message });
    }
};


export const getBadges = async (req, res) => {
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching badges', error: error.message });
    }
};
export const deleteBadgeById = async (req, res) => {
    const badgeId = req.params.id;

    try {
        const deletedBadge = await Badge.findByIdAndDelete(badgeId);

        if (!deletedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }

        res.status(200).json({ message: 'Badge deleted successfully', deletedBadge });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting badge', error: error.message });
    }
};
