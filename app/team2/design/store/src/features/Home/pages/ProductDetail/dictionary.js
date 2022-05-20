import normalizeNumber from '../../../../logic/normalizeNumber';

const dictionary = {
    getBook: (item) => {
        return {
            id: item.id,
            cart: item.cart,
            header: item.title,
            originPrice: normalizeNumber(Math.round(item.price)),
            price: normalizeNumber(item.price * (1 - item.discount)),
            discount: Math.round(item.discount * 100),
            images:
                item.images.length > 0
                    ? item.images.map((image) => {
                          const img = process.env.REACT_APP_API_URL + image.img;
                          const imageRef = { img };
                          return imageRef;
                      })
                    : [
                          {
                              id: 1,
                              image: process.env.PUBLIC_URL + '/images/box.png',
                              index: 0
                          }
                      ],
            description: item.description,
            brand: {
                title: 'Nhà phát hành',
                value: item.book.publisher.name,
                link: `/product/book?book_publisher_name=${item.book.publisher.name}`
            },
            breadcrumb: {
                display: 'Sách',
                link: '/product/book'
            },
            listDetail: [
                {
                    title: 'Thể loại sách',
                    value: item.book.category.name,
                    link: `/product/book?book_category_name=${item.book.category.name}`
                },
                {
                    title: 'Tác giả',
                    value: item.book.author.name,
                    link: `/product/book?book_author_name=${item.book.author.name}`
                },
                {
                    title: 'Ngôn ngữ',
                    value: item.book.language
                },
                {
                    title: 'Số trang',
                    value: item.book.numberOfPages
                },
                {
                    title: 'Ngày phát hàng',
                    value: item.book.publicationDate
                },
                {
                    title: 'Tên sách',
                    value: item.book.name
                }
            ]
        };
    },
    getClothes: (item) => {
        return {
            id: item.id,
            cart: item.cart,
            header: item.title,
            originPrice: normalizeNumber(Math.round(item.price)),
            price: normalizeNumber(item.price * (1 - item.discount)),
            discount: Math.round(item.discount * 100),
            images:
                item.images.length > 0
                    ? item.images.map((image) => {
                          const img = process.env.REACT_APP_API_URL + image.img;
                          const imageRef = { img };
                          return imageRef;
                      })
                    : [
                          {
                              id: 1,
                              image: process.env.PUBLIC_URL + '/images/box.png',
                              index: 0
                          }
                      ],
            description: item.description,
            brand: {
                title: 'Thương hiệu',
                value: item.clothes.brand,
                link: `/product/clothes?clothes_brand=${item.clothes.brand}`
            },
            breadcrumb: {
                display: 'Quần áo',
                link: '/product/clothes'
            },
            listDetail: [
                {
                    title: 'Loại sản phẩm',
                    value: item.clothes.type.name,
                    link: `product/clothes?clothes_type_name=${item.clothes.type.name}`
                },
                {
                    title: 'Chất liệu',
                    value: item.clothes.material
                },
                {
                    title: 'Nguồn gốc xuất sứ',
                    value: item.clothes.countryOfOrigin
                },
                {
                    title: 'Size',
                    value: item.clothes.size
                },
                {
                    title: 'Mẫu',
                    value: item.clothes.pattern
                },
                {
                    title: 'Size lớn',
                    value: item.clothes.plusSize ? 'Có' : 'Không'
                }
            ]
        };
    },
    getLaptop: (item) => {
        return {
            id: item.id,
            cart: item.cart,
            header: item.title,
            originPrice: normalizeNumber(Math.round(item.price)),
            price: normalizeNumber(item.price * (1 - item.discount)),
            discount: Math.round(item.discount * 100),
            images:
                item.images.length > 0
                    ? item.images.map((image) => {
                          const img = process.env.REACT_APP_API_URL + image.img;
                          const imageRef = { img };
                          return imageRef;
                      })
                    : [
                          {
                              id: 1,
                              image: process.env.PUBLIC_URL + '/images/box.png',
                              index: 0
                          }
                      ],
            description: item.description,
            brand: {
                title: 'Nhà sản xuất',
                value: item.laptop.producer.name,
                link: `/product/laptop?laptop_brand=${item.laptop.producer.name}`
            },
            breadcrumb: {
                display: 'Laptop',
                link: '/product/laptop'
            },
            listDetail: [
                {
                    title: 'Mẫu laptop',
                    value: item.laptop.name
                },
                {
                    title: 'Loại laptop',
                    value: item.laptop.laptopType
                },
                {
                    title: 'Bộ nhớ',
                    value: item.laptop.storageType
                },
                {
                    title: 'Khối lượng',
                    value: item.laptop.weight
                }
            ]
        };
    }
};

export default dictionary;
