import mongoose from "mongoose";
import { Schema } from "mongoose";

// konek ke database mongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/tutorial', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// cek connection
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected......'));

// Inisiasi BlogSchema
const blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    postDate: {
        type: Date,
        default: Date.now
    }
});

// melakukan compile model ke dalam MongoDB
const Blog = mongoose.model('Blog', blogSchema);

// melakukan penyimpanan ke dalam database mongoDB dengan cara pertama
const blogFirst = new Blog({
    title: 'Buku Harry Potter',
    author: 'J. K. Rowling',
    body: 'Harry Potter adalah seri tujuh novel fantasi yang dikarang oleh penulis Inggris J. K. Rowling. Novel ini mengisahkan tentang petualangan seorang penyihir remaja bernama Harry Potter dan sahabatnya, Ronald Bilius Weasley dan Hermione Jean Granger, yang merupakan pelajar di Sekolah Sihir Hogwarts.'
})

// melakukan save ke dalam collection Blog
blogFirst.save((err, res) => {
    if (err) return handleError(err);
    // saved!
    console.log(res)
    console.log('successfully created data')
});

// melakukan save, dengan cara kedua
const blogSecond = new Blog({
    title: 'Buku The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    body: 'The Lord of the Rings adalah seri film berisi tiga film petualangan fantasi yang disutradarai Peter Jackson. Film tersebut berdasarkan novel The Lord of the Rings oleh J. R. R. Tolkien. Film-film tersebut berjudul The Fellowship of the Ring, The Two Towers dan The Return of the King.'
})

Blog.create(blogSecond, (err, res) => {
    if (err) return handleError(err);
    // saved!
    console.log(res);
    console.log('Successfuly create data')
});
  

// untuk mengambil semua data dari database MongoDB
Blog.find((err, res) => {
    if(err) console.log(err);
    console.log(res)
})

// untuk mengambil data, berdasarkan Judul
Blog.findOne({ 'title' : 'Buku Harry Potter' }, (err, res) => {
    if(err) console.log(err);
    console.log('first result', res)
})

// untuk mengambil data, jika judul mengandung kata 'Harry'
Blog.find({ 'title' : /Harry/ }, 'title author', (err, res) => {
    if(err) console.log(err);
    console.log('second result', res)
})

// untuk mengambil data, jika judul mengandung kata 'Harry', menggunakan query builder
const query = Blog.findOne({ 'title': 'Buku Harry Potter' });

// untuk menentukan select query
query.select('title author');

query.exec(function (err, res) {
    if (err) return handleError(err);
    console.log('third result', res.title, res.author);
});


// untuk mengupdate data, berdasarkan title : 'Buku Harry Potter'
Blog.updateOne({ title: 'Buku Harry Potter' }, { author: 'Rizal' }, (err, res) => {
    if (err) return handleError(err);
    console.log(res);
    console.log('Successfuly update data!')
});


// untuk menghapus data, berdasarkan author : 'Rizal'
Blog.deleteOne({ author: 'Rizal' }, (err) => {
    if (err) return handleError(err);
    console.log('Successfuly delete data!')
});


