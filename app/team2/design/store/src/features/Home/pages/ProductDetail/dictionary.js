const dictionary = {
  getBook: (item) => {
    let book = item.book;
    return {
      id: item.id,
      header: item.header,
      originPrice: Math.round(item.price).toLocaleString(undefined, {
        minimumFractionDigits: 0,
      }),
      price: Math.round(item.price * (1 - item.discount)).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
        }
      ),
      discount: Math.round(item.discount * 100),
      images:
        item.images.length > 0
          ? item.images.map((image) => {
              image.image = process.env.REACT_APP_API_URL + image.image;
              return image;
            })
          : [
              {
                id: 1,
                image: process.env.PUBLIC_URL + '/images/box.png',
                index: 0,
              },
            ],
      description: item.description,
      brand: {
        title: 'Nhà phát hành',
        value: book.publisher.name,
        link: `/product/publisher=${book.publisher.id}`,
      },
      breadcrumb: {
        display: 'Sách',
        link: '/product/book',
      },
      listDetail: [
        {
          title: 'Thể loại sách',
          value: book.category.name,
          link: `product/?category=${book.category.id}`,
        },
        {
          title: 'Tác giả',
          value: book.author.name,
          link: `product/?author=${book.author.id}`,
        },
        {
          title: 'Ngôn ngữ',
          value: book.language,
        },
        {
          title: 'Số trang',
          value: book.numberOfPages,
        },
        {
          title: 'Ngày phát hàng',
          value: book.publicationDate,
        },
        {
          title: 'Tên sách',
          value: book.title,
        },
      ],
    };
  },
};

export default dictionary;
