import Job from '../models/jobs.model.js';

const getAllJobs = async (req, res) => {

    try {
        const Jobs = await Job.find().sort({ _id: -1 });
        res.json(Jobs);
    } catch (error) {
        console.error('Error fetching Jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        console.error('Error creating Job:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteJob = async (req, res) => {
    const id = req.params.id;
    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.log('Error deleting Job:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllJobs, createJob, deleteJob };

