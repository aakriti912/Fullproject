import Books from "../../models/Books.js";
import BookImage from "../../models/BookImage.js";
import User from "../../models/User.js";
import fs from "fs";
import BookOrders from "../../models/BookOrders.js";
import BookRatings from "../../models/BookRatings.js";

class BooksController {
  async index(req, res) {
    let booksData = await Books.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $lookup: {
          from: "bookimages",
          foreignField: "bookId",
          localField: "_id",
          as: "gallery",
        },
      },

      {
        $lookup: {
          from: "faculties",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty",
        },
      },
    ]);

    booksData.forEach((book) => {
      book.gallery.forEach((image) => {
        image.image = process.env.BASE_URL + "/uploads/books/" + image.image;
      });
    });
    booksData = booksData.map((book) => {
      book.postedBy = book.user[0].name;
      return book;
    });
    booksData = booksData.map((book) => {
      book.ownerId = book.user[0]._id;
      return book;
    });

    booksData = booksData.map((book) => {
      delete book.user;
      return book;
    });

    booksData = booksData.map((book) => {
      book.faculty = book.faculty[0].name;
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        book.image = book.gallery[0].image;
      } else {
        book.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
      }
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        delete book.gallery;
      }
      return book;
    });
    res.json({ books: booksData });
  }

  async getBookDetails(req, res) {
    let booksData = await Books.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $lookup: {
          from: "bookimages",
          foreignField: "bookId",
          localField: "_id",
          as: "gallery",
        },
      },

      {
        $lookup: {
          from: "faculties",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty",
        },
      },
    ]);

    let bookId = req.params.id;
    booksData = booksData.filter((book) => {
      return book._id == bookId;
    });

    booksData.forEach((book) => {
      book.gallery.forEach((image) => {
        image.image = process.env.BASE_URL + "/uploads/books/" + image.image;
      });
    });
    booksData = booksData.map((book) => {
      book.postedBy = book.user[0].name;
      return book;
    });
    booksData = booksData.map((book) => {
      book.ownerId = book.user[0]._id;
      return book;
    });

    booksData = booksData.map((book) => {
      delete book.user;
      return book;
    });

    booksData = booksData.map((book) => {
      book.faculty = book.faculty[0].name;
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        book.image = book.gallery[0].image;
      } else {
        book.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
      }
      return book;
    });

    booksData = booksData.shift();

    // find rating of the book and user
    let bookRating = await BookRatings.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    // filter the rating of the book
    bookRating = bookRating.filter((rating) => {
      return rating.bookId == bookId;
    });
    // get rating user with image
    bookRating = bookRating.map((rating) => {
      rating.userName = rating.user[0].name;
      if (rating.user[0].image) {
        rating.userImage =
          process.env.BASE_URL + "/uploads/users/" + rating.user[0].image;
      } else {
        rating.userImage =
          process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
      }
      return rating;
    });
    // delete user field
    bookRating = bookRating.map((rating) => {
      delete rating.user;
      return rating;
    });
    booksData.bookRatingsData = bookRating;
    res.json({ books: booksData });
  }

  async store(req, res) {
    let book = await Books.create({ ...req.body });
    if (req.files) {
      req.files.map(async (file) => {
        await BookImage.create({ bookId: book._id, image: file.filename });
      });
    }
    res.status(200).json({ success: "Book created successfully" });
  }

  async loginUserBooks(req, res) {
    let booksData = await Books.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $lookup: {
          from: "bookimages",
          foreignField: "bookId",
          localField: "_id",
          as: "gallery",
        },
      },
      {
        $lookup: {
          from: "faculties",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty",
        },
      },
    ]);

    booksData = booksData.map((book) => {
      book.faculty = book.faculty[0].name;
      return book;
    });

    booksData.forEach((book) => {
      book.gallery.forEach((image) => {
        image.image = process.env.BASE_URL + "/uploads/books/" + image.image;
      });
    });
    booksData = booksData.map((book) => {
      book.postedBy = book.user[0].name;
      book.postedById = book.user[0]._id;
      return book;
    });
    booksData = booksData.map((book) => {
      delete book.user;
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        book.image = book.gallery[0].image;
      } else {
        book.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
      }
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        delete book.gallery;
      }
      return book;
    });

    let userId = req.params.id;
    let userData = await User.findById(userId);
    let role = userData.role;
    if (role == "user") {
      booksData = booksData.filter((book) => {
        return book.postedById == userId;
      });
      res.status(200).json({ books: booksData });
    } else {
      res.status(200).json({ books: booksData });
    }
  }

  async destroy(req, res) {
    let bookId = req.params.id;
    let totalFindData = await BookImage.find({
      bookId: bookId,
    }).countDocuments();
    if (totalFindData) {
      let findImage = await BookImage.find({ bookId: bookId });
      console.log(findImage);
      let totalImageDelete = 0;
      findImage.map(async (image) => {
        let filePath =
          process.cwd() + "\\public\\uploads\\books\\" + image.image;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          await BookImage.deleteOne({ bookId: bookId });
          totalImageDelete++;
        } else {
          await BookImage.deleteOne({ bookId: bookId });
          totalImageDelete++;
        }
      });
      if (totalImageDelete === totalFindData) {
        await Books.findByIdAndDelete(bookId);
        res.status(200).json({ success: "Book deleted successfully" });
      } else {
        await Books.findByIdAndDelete(bookId);
        res.status(200).json({ success: "Book deleted successfully" });
      }
    } else {
      await Books.findByIdAndDelete(bookId);
      res.status(200).json({ success: "Book deleted successfully" });
    }
  }

  /*
    ========================Books Gallery All =====================
     */

  async bookGalleryIndex(req, res) {
    let bookId = req.params.id;
    let bookGalleryData = await BookImage.find({ bookId: bookId });
    bookGalleryData.forEach((image) => {
      if (image.image) {
        image.image = process.env.BASE_URL + "/uploads/books/" + image.image;
      } else {
        image.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
      }
    });
    res.status(200).json({ bookGallery: bookGalleryData });
  }

  async addBookImage(req, res) {
    let bookImages;
    if (req.files) {
      req.files.map(async (file) => {
        let bookId = req.body.bookId;
        bookImages = await BookImage.create({
          bookId: bookId,
          image: file.filename,
        });
      });
    }
    res
      .status(200)
      .json({ bookImages: bookImages, success: "Image not inserted" });
  }

  /*
    ========================End Books Gallery All =====================
     */

  /*
    =======================Book Order=====================
     */
  async addBookOrder(req, res) {
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    let checkBookOrder = await BookOrders.find({
      bookId: bookId,
      userId: userId,
    }).countDocuments();
    if (checkBookOrder.length > 0) {
      await BookOrders.findOneAndUpdate(
        { bookId: bookId },
        { $inc: { quantity: 1 } }
      );
      res.status(200).json({ success: "Book order success" });
    } else {
      await BookOrders.create({ ...req.body });
      res.status(200).json({ success: "Order placed successfully" });
    }
  }

  async getBookOrderList(req, res) {
    let bookOrders = await BookOrders.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
    ]);
    bookOrders = bookOrders.map((bookOrder) => {
      bookOrder.book = bookOrder.book[0].title;
      return bookOrder;
    });
    bookOrders = bookOrders.map((bookOrder) => {
      bookOrder.user = bookOrder.user[0].name;
      return bookOrder;
    });
    let userId = req.params.id;
    let userData = await User.findById(userId);
    let role = userData.role;
    if (role === "user") {
      let userBooks = await Books.find({ postedBy: userId });

      if (userBooks.length > 0) {
        bookOrders = bookOrders.filter((order) => {
          return order.ownerId == userId;
        });
        res.status(200).json({ books: bookOrders });
      } else {
        bookOrders = bookOrders.filter((order) => {
          return order.userId == userId;
        });
        res.status(200).json({ books: bookOrders });
      }
    } else {
      res.status(200).json({ books: bookOrders });
    }
  }

  /*
    =======================End Book Order=====================
     */

  async getBookByFaculties(req, res) {
    let booksData = await Books.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $lookup: {
          from: "bookimages",
          foreignField: "bookId",
          localField: "_id",
          as: "gallery",
        },
      },

      {
        $lookup: {
          from: "faculties",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty",
        },
      },
    ]);

    booksData.forEach((book) => {
      book.gallery.forEach((image) => {
        image.image = process.env.BASE_URL + "/uploads/books/" + image.image;
      });
    });
    booksData = booksData.map((book) => {
      book.postedBy = book.user[0].name;
      return book;
    });
    booksData = booksData.map((book) => {
      book.ownerId = book.user[0]._id;
      return book;
    });

    booksData = booksData.map((book) => {
      delete book.user;
      return book;
    });

    booksData = booksData.map((book) => {
      book.faculty = book.faculty[0].name;
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        book.image = book.gallery[0].image;
      } else {
        book.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
      }
      return book;
    });
    booksData = booksData.map((book) => {
      if (book.gallery.length > 0) {
        delete book.gallery;
      }
      return book;
    });
    let facultyId = req.params.id;
    booksData = booksData.map((book) => {
      return book.faculty == facultyId;
    });
    res.json({ books: booksData });
  }

  async searchBooks(req, res) {
    let search = req.params.criteria;
    console.log(search);
    let booksData = await Books.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json({ books: booksData });
  }

  async addBookRating(req, res) {
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    let rating = req.body.rating;
    let checkBookRating = await BookRatings.find({
      bookId: bookId,
      userId: userId,
    }).countDocuments();
    if (checkBookRating > 0) {
      await BookRatings.findOneAndUpdate(
        { bookId: bookId, userId: userId },
        { $set: { rating: rating } }
      );
      res.status(200).json({ success: "Book rating success" });
    } else {
      await BookRatings.create({ ...req.body });
      res.status(200).json({ success: "Book rating success" });
    }
  }

  async addBookReview(req, res) {
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    let review = req.body.review;
    let checkBookReview = await BookRatings.find({
      bookId: bookId,
      userId: userId,
    }).countDocuments();
    if (checkBookReview > 0) {
      await BookRatings.findOneAndUpdate(
        { bookId: bookId, userId: userId },
        { $set: { review: review } }
      );
      res.status(200).json({ success: "Book review success" });
    } else {
      await BookRatings.create({ ...req.body });
      res.status(200).json({ success: "Book review success" });
    }
  }

  async updateOrderStatus(req, res) {
    let orderId = req.body.orderId;
    let status = req.body.status;
    if (status === "accepted") {
      status = "accepted";
      await BookOrders.findOneAndUpdate(
        { _id: orderId },
        { $set: { status: status } }
      );
      res.status(200).json({ success: "Order status updated" });
    }
    if (status === "rejected") {
      status = "rejected";
      await BookOrders.findOneAndUpdate(
        { _id: orderId },
        { $set: { status: status } }
      );
      res.status(200).json({ success: "Order status updated" });
    }

    if (status === "cancel") {
      let orderId = req.body.orderId;
      await BookOrders.findOneAndDelete({ _id: orderId });
      res.status(200).json({ success: "Order deleted" });
    }
  }

  async show(req, res) {
    let bookId = req.params.id;
    let bookData = await Books.aggregate([
      {
        $lookup: {
          from: "faculties",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty",
        },
      },
    ]);
    // get book by book id
    bookData = bookData.filter((book) => {
      return book._id == bookId;
    });
    // get faculty name
    bookData = bookData.map((book) => {
      book.faculty_name = book.faculty[0].name;
      return book;
    });
    // get faculty id
    bookData = bookData.map((book) => {
      book.faculty_id = book.faculty[0]._id;
      return book;
    });

    // delete faculty
    bookData = bookData.map((book) => {
      delete book.faculty;
      return book;
    });
    // remove first element
    bookData = bookData.shift();
    res.status(200).json({ book: bookData });
  }

  async update(req, res) {
    let bookId = req.params.id;
    await Books.findOneAndUpdate({ _id: bookId }, { $set: { ...req.body } });
    res.status(200).json({ success: "Book updated" });
  }
}

export default BooksController;
