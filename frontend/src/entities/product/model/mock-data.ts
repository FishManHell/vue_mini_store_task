import { CATEGORY, type ProductDetails } from './types'

export const mockProducts: ProductDetails[] = [
  {
    id: '1',
    name: 'The Pragmatic Programmer',
    shortDescription: 'A timeless guide to mastering the craft of software development.',
    longDescription:
      'Written by Andrew Hunt and David Thomas, this twentieth-anniversary edition revisits the practices that have shaped modern software engineering. Topics range from automation and the DRY principle to defensive programming and pragmatic estimation. Every chapter is grounded in concrete examples you can apply on Monday morning.',
    price: '29.99',
    thumbnailUrl: 'https://picsum.photos/seed/product-1/600/600',
    category: CATEGORY.EBOOK,
    reviews: [
      {
        id: 'r-1-1',
        author: 'Marta L.',
        rating: 5,
        comment: 'A must-read regardless of how long you have been writing code.',
        createdAt: '2025-08-14',
      },
      {
        id: 'r-1-2',
        author: 'Daniel P.',
        rating: 4,
        comment: 'Some advice feels dated, but the core principles are evergreen.',
        createdAt: '2025-11-02',
      },
    ],
  },
  {
    id: '2',
    name: 'Designing Data-Intensive Applications',
    shortDescription: 'Deep dive into the architecture of reliable, scalable, and maintainable systems.',
    longDescription:
      'Martin Kleppmann unpacks the storage engines, replication strategies and consistency models behind every serious backend system. Diagrams illustrate trade-offs between leader-based replication, multi-leader topologies and CRDTs. Ideal for engineers moving from app-level work into distributed systems.',
    price: '39.99',
    thumbnailUrl: 'https://picsum.photos/seed/product-2/600/600',
    category: CATEGORY.EBOOK,
    reviews: [
      {
        id: 'r-2-1',
        author: 'Igor V.',
        rating: 5,
        comment: 'The clearest explanation of consensus and replication I have ever read.',
        createdAt: '2025-09-10',
      },
    ],
  },
  {
    id: '3',
    name: 'Sublime Text — Personal License',
    shortDescription: 'Sophisticated text editor for code, markup, and prose. Lifetime license.',
    longDescription:
      'A one-time purchase that unlocks Sublime Text on macOS, Windows and Linux for a single user. Includes three years of free updates, multi-caret editing, project-wide goto, and a sprawling plugin ecosystem powered by Python. Perfect for engineers who prefer a snappy native editor over electron alternatives.',
    price: '99.00',
    thumbnailUrl: 'https://picsum.photos/seed/product-3/600/600',
    category: CATEGORY.SOFTWARE_LICENSE,
    reviews: [
      {
        id: 'r-3-1',
        author: 'Tara S.',
        rating: 5,
        comment: 'Still the fastest editor on my machine. Worth every cent.',
        createdAt: '2025-07-21',
      },
      {
        id: 'r-3-2',
        author: 'Ben K.',
        rating: 3,
        comment: 'Powerful, but I missed proper LSP support out of the box.',
        createdAt: '2025-10-30',
      },
    ],
  },
  {
    id: '4',
    name: 'Affinity Designer 2',
    shortDescription: 'Professional vector and raster design tool. One-time purchase, no subscription.',
    longDescription:
      'Affinity Designer 2 brings non-destructive editing, a refined contour tool and live shape primitives into a single performant package. Switch between vector and pixel personas without leaving your document, and export complete artboards to PDF, SVG or PNG with one click. Great for product designers tired of monthly fees.',
    price: '69.99',
    thumbnailUrl: 'https://picsum.photos/seed/product-4/600/600',
    category: CATEGORY.SOFTWARE_LICENSE,
    reviews: [
      {
        id: 'r-4-1',
        author: 'Olha M.',
        rating: 4,
        comment: 'Feature parity with Illustrator for 90% of my work.',
        createdAt: '2025-12-05',
      },
    ],
  },
  {
    id: '5',
    name: 'Advanced Vue 3 & Composition API',
    shortDescription: 'Build production-grade apps with Vue 3, TypeScript, and modern patterns.',
    longDescription:
      'Twenty-two hours of video plus a companion repository covering composables, render functions, Pinia state design, server-side rendering with Nuxt 3, and Vitest-driven component testing. Each module ends with a code review walkthrough so you can compare your solution against the instructor’s.',
    price: '149.00',
    thumbnailUrl: 'https://picsum.photos/seed/product-5/600/600',
    category: CATEGORY.ONLINE_COURSE,
    reviews: [
      {
        id: 'r-5-1',
        author: 'Pavel N.',
        rating: 5,
        comment: 'The composables module alone justifies the price.',
        createdAt: '2025-08-29',
      },
      {
        id: 'r-5-2',
        author: 'Sofia R.',
        rating: 5,
        comment: 'Finally a course that takes TypeScript seriously.',
        createdAt: '2025-11-19',
      },
    ],
  },
  {
    id: '6',
    name: 'Mastering TypeScript Fundamentals',
    shortDescription: 'From basics to advanced types — full course with hands-on exercises.',
    longDescription:
      'Start from primitives and finish in conditional, mapped and template literal types. The course is structured as forty short lessons, each followed by a graded exercise checked by the embedded type-level test runner. Bonus chapter covers practical declaration-file authoring for untyped npm packages.',
    price: '89.00',
    thumbnailUrl: 'https://picsum.photos/seed/product-6/600/600',
    category: CATEGORY.ONLINE_COURSE,
    reviews: [
      {
        id: 'r-6-1',
        author: 'Anton G.',
        rating: 4,
        comment: 'Solid intro. The advanced types chapter could be longer.',
        createdAt: '2025-09-22',
      },
    ],
  },
  {
    id: '7',
    name: 'SaaS Landing Page Template',
    shortDescription: 'Production-ready Tailwind landing page with 12 sections and dark mode.',
    longDescription:
      'A Vue 3 + Tailwind v3 starter laid out around twelve composable sections — hero, feature grid, pricing, testimonials, FAQ and more. Dark mode is wired through a single class on the html element. Includes a Figma source file matching the implementation pixel-for-pixel.',
    price: '39.00',
    thumbnailUrl: 'https://picsum.photos/seed/product-7/600/600',
    category: CATEGORY.TEMPLATE,
    reviews: [
      {
        id: 'r-7-1',
        author: 'Lena O.',
        rating: 5,
        comment: 'Shipped our launch page in a weekend thanks to this.',
        createdAt: '2025-10-08',
      },
      {
        id: 'r-7-2',
        author: 'Mike J.',
        rating: 4,
        comment: 'Lovely defaults, but the pricing section needed a custom rebuild.',
        createdAt: '2025-12-14',
      },
    ],
  },
  {
    id: '8',
    name: 'Notion OKR Tracker',
    shortDescription: 'Goal-tracking dashboard for teams. Quarterly OKRs with progress views.',
    longDescription:
      'A Notion template purpose-built for teams running quarterly OKRs. Includes a relational schema linking objectives, key results and weekly check-ins, plus pre-built filtered views for leads, IC contributors and exec readouts. Comes with a one-page rollout guide.',
    price: '19.00',
    thumbnailUrl: 'https://picsum.photos/seed/product-8/600/600',
    category: CATEGORY.TEMPLATE,
    reviews: [
      {
        id: 'r-8-1',
        author: 'Nadia P.',
        rating: 4,
        comment: 'Replaced three spreadsheets and our quarterly review meeting agenda.',
        createdAt: '2025-11-26',
      },
    ],
  },
]
