
const hijabStyles = [
    {
        "id": "1",
        "name": "Aylin sapphire Abaya",
        "image": "https://abaya.pk/cdn/shop/files/3_09f7b63b-a1ed-48e0-98d5-0dfc563ec870.jpg?v=1693827368",
        "description": "Lightweight chiffon hijab perfect for formal occasions and elegant looks."
    },
    {
        "id": "2",
        "name": "Turkish slub",
        "image": "https://thehijabcompany.pk/cdn/shop/products/Turkish-Hijabs---THC---Navy-1.jpg?v=1707911583",
        "description": "Comfortable cotton hijab ideal for daily wear and casual outings."
    },
    {
        "id": "3",
        "name": "Montreal Collection",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzG5gSjaWm9NctvCg6tNiS3QjK5Lt2hZkEhQ&s",
        "description": "Smooth satin hijab that gives a shiny, stylish, and modern look."
    },
    {
        "id": "4",
        "name": "Coffee Hijab",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TbMIqEB5O2ekYxf53LSmXvIV25U8UhEEtw&s",
        "description": "Stretchy jersey fabric hijab designed for active and sporty lifestyles."
    },
    {
        "id": "5",
        "name": "palne Scarg",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7Kg7SgjqVyip-qYnOkrTy6CGBuC8L_f1sHOLGsfAJ4sC3qPbyumdDJJK2DZ1gjGMmdA&usqp=CAU",
        "description": "Timeless silk hijab that adds a touch of luxury and softness."
    },
    {
        "id": "6",
        "name": "Printed Georgette",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoGQpBd0kjdlxUaMg4ZPD-ozVh304nQ3YCUg&s",
        "description": "Light and flowy georgette hijab with beautiful prints for a stylish look."
    },
    {
        "id": "7",
        "name": "Lace Embellished",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDCtWudhg64ZduD4FkHyGy20VoNnZY7A_J8w&s",
        "description": "Hijab with delicate lace details perfect for weddings and parties."
    },
    {
        "id": "8",
        "name": "Cotton Voile",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHzUFBXrZ96c2p_pHfJmnGfvbVzR2fWyHpCDVSYHl5wWpR7JnDSKj-V5qR6gsNenXZGs&usqp=CAU",
        "description": "Soft cotton voile hijab, breathable and perfect for summers."
    },
    {
        "id": "9",
        "name": "Crinkled Cotton",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS26QYYTFEK0IB56RWlhmT7-Ta97Oy9TyH3OQ&s",
        "description": "Textured crinkled cotton hijab that adds volume and style."
    },
    {
        "id": "10",
        "name": "Chiffon Wrap",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmTCCknpM09kX2cQwPvamW5okZMetGAAJCTjWzqz9WXxeMQvUE3glk5yYJNgCKVKxNqEU&usqp=CAU",
        "description": "Elegant chiffon wrap for a graceful and modest appearance."
    },
    {
        "id": "11",
        "name": "Velvet Touch",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhXfGMDnvh131t6bWopZtxobuzOOYbA4enRw&s",
        "description": "Soft velvet hijab with rich texture for winter seasons."
    },
    {
        "id": "12",
        "name": "Jersey Cap",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuOhNZpQ04ewHgPrpjFhbQEZf3m8JAtudcTw&s",
        "description": "Comfortable jersey hijab cap for everyday wear."
    },
    {
        "id": "13",
        "name": "Silk Satin Blend",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc567Z5cLt7f4kd04cXWnmplEE0dh6Uou5zlcHbpdoFrPWe0FoOkINWSAm_XnL-QMA-Ss&usqp=CAU",
        "description": "Smooth satin blend hijab that’s both stylish and comfortable."
    },
    {
        "id": "14",
        "name": "Printed Satin",
        "image": "https://iamhijabi.pk/cdn/shop/files/01_1.webp?v=1734358510",
        "description": "Satin hijab with trendy prints, perfect for a modern look."
    },
    {
        "id": "15",
        "name": "Linen Blend",
        "image": "https://i.pinimg.com/236x/42/6d/f0/426df0be603ddbc619bb69bf287451e6.jpg",
        "description": "Breathable linen blend hijab, perfect for warm weather."
    },
    {
        "id": "16",
        "name": "Floral Print",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFZfO3ofraYqo2-U2z3DtoMystc3iY0G4zg&s",
        "description": "Bright floral print hijab to add a pop of color."
    },
    {
        "id": "17",
        "name": "Plain Jersey",
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        "description": "Simple plain jersey hijab for daily casual looks."
    },
    {
        "id": "18",
        "name": "Polka Dot Chiffon",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuA3MSd82p_mhjomOZQrn8A4Ah0JOB6sJtLQ&s",
        "description": "Chiffon hijab with stylish polka dot pattern."
    },
    {
        "id": "19",
        "name": "Embroidery Detail",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZbpQglj3ssrhZBdrF2uL3ic2GXw61n3DUg&s",
        "description": "Hijab featuring elegant embroidery for a sophisticated touch."
    },
    {
        "id": "20",
        "name": "Crinkled Chiffon",
        "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP70d-N8DOtxsPzzhlrlIuOJ2MeQWF_Wq1AA&s",
        "description":"Textured crinkled chiffon hijab that’s light and stylish."
    }
]

export default hijabStyles