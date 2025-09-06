import { faker } from '@faker-js/faker';
import { Product } from '../types';

const categories = ['rings', 'necklaces', 'earrings', 'bracelets'] as const;

const productNames = {
  rings: [
    'Anel Solitário Diamante',
    'Anel Ouro Rosa Elegante',
    'Anel Trio Esmeraldas',
    'Anel Vintage Pérola',
    'Anel Infinito Dourado'
  ],
  necklaces: [
    'Colar Corrente Ouro',
    'Colar Pérolas Clássico',
    'Colar Coração Diamante',
    'Colar Layering Delicado',
    'Colar Statement Cristais'
  ],
  earrings: [
    'Brincos Argola Dourados',
    'Brincos Pérola Clássicos',
    'Brincos Pendentes Cristal',
    'Brincos Botão Diamante',
    'Brincos Cascade Elegantes'
  ],
  bracelets: [
    'Pulseira Tennis Diamantes',
    'Pulseira Corrente Ouro',
    'Pulseira Berloques Charm',
    'Pulseira Riviera Cristais',
    'Pulseira Vintage Pérolas'
  ]
};

export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  categories.forEach((category, categoryIndex) => {
    productNames[category].forEach((name, index) => {
      const price = faker.number.float({ min: 299, max: 2999, fractionDigits: 2 });
      const originalPrice = Math.random() > 0.7 ? price * 1.3 : undefined;
      
      products.push({
        id: `${category}-${index + 1}`,
        name,
        description: `${name} - Peça exclusiva da coleção AYVI JOIAS, confeccionada com materiais premium e design único. Elegância e sofisticação em cada detalhe.`,
        price,
        originalPrice,
        category,
        images: [
          `https://images.unsplash.com/photo-${1520000000000 + categoryIndex * 1000 + index}?w=400&h=400&fit=crop&crop=center`,
          `https://images.unsplash.com/photo-${1520000000000 + categoryIndex * 1000 + index + 100}?w=400&h=400&fit=crop&crop=center`,
          `https://images.unsplash.com/photo-${1520000000000 + categoryIndex * 1000 + index + 200}?w=400&h=400&fit=crop&crop=center`
        ],
        inStock: Math.random() > 0.1,
        featured: Math.random() > 0.7,
        rating: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 }),
        reviews: faker.number.int({ min: 15, max: 250 })
      });
    });
  });
  
  return products;
};

export const products = generateProducts();
