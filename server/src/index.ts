import express from 'express';
import product from './routes/productRoute';
import user from './routes/userRoute';
import category from './routes/categoryRoute';

const app = express()
app.use(express.json())

app.use('/product', product)
app.use('/user', user)
app.use('/category', category)

app.listen(3000, () => console.log('Server is running on port 3000')
)