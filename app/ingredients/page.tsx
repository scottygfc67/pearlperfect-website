import Navbar from '@/components/Navbar';
import Ingredients from '@/components/Ingredients';
import Footer from '@/components/Footer';

export default function IngredientsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Ingredients />
      <Footer />
    </div>
  );
}
