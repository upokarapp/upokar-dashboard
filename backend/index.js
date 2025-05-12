// External dependencies
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connection from './config/db.js';
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import fileRoutes from './routes/file.routes.js';
import productRoutes from './routes/product.routes.js';
import hospitalRoutes from './routes/hospital.routes.js';
import ambulanceRoutes from './routes/ambulance.routes.js';
import pharmacyRoutes from './routes/pharmacy.routes.js';
import homioRoutes from './routes/homio.routes.js';
import animalCareRoutes from './routes/animalCare.routes.js';
import community from "./routes/community.js"
import kutirShilpo from './routes/kutirShilpo.js';
import giftRoutes from './routes/gift.routes.js';
import coaching from './routes/coaching.js';
import skillAndIT from './routes/skillandit.js';
import volunteer from './routes/volunteer.routes.js';
import orderRoutes from './routes/order.routes.js';
import giftOrderRoutes from './routes/giftOrder.routes.js';
import kutirOrderRoutes from './routes/kutir.routes.js';
import bloodDonor from './routes/bloodDonor.routes.js';
import transportRoutes from './routes/transport.routes.js';
import cylinderRoutes from './routes/cylinder.routes.js';
import gasPriceRoutes from './routes/gasPrice.routes.js';
import slideImages from './routes/slider.routes.js';
import tuitionRoutes from './routes/tuitions.routes.js';
import jobsRoutes from './routes/jobs.routes.js';
import landf from './routes/landf.routes.js';
import labor from './routes/labor.routes.js';
import total from './routes/total.routes.js'


dotenv.config();
connection();

// Initialize express app
const app = express();
app.set('trust proxy', 1);





const corsOptions = {
  origin: (origin, callback) => {
    if(origin)
    {
      console.log(origin);
    }
    if (!origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Additional routes
app.use(userRouter);
app.use(adminRouter);
app.use(productRoutes);
app.use(hospitalRoutes);
app.use(ambulanceRoutes);
app.use(pharmacyRoutes);
app.use(homioRoutes);
app.use(animalCareRoutes);
app.use(community);
app.use(kutirShilpo);
app.use(giftRoutes);
app.use(coaching);
app.use(skillAndIT);
app.use(volunteer)
app.use(orderRoutes);
app.use(giftOrderRoutes);
app.use(kutirOrderRoutes);

app.use(bloodDonor);
app.use(transportRoutes);
app.use(cylinderRoutes);
app.use(gasPriceRoutes);
app.use(slideImages);
app.use(tuitionRoutes);
app.use(jobsRoutes);
app.use(labor);
app.use(landf);
app.use(total);
app.use('/api', fileRoutes);
// Basic root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err.message);
  process.exit(1);
});
