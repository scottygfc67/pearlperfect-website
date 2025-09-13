'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageLoader from '@/components/ui/PageLoader';
import { Check, Clock, Shield, Sparkles, Zap, Star } from 'lucide-react';

export default function HowItWorks() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLoader isLoading={isLoading}>
      <div className="min-h-screen bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
            🦷 How PearlPerfect V34 Works
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to your brightest smile yet — here&apos;s exactly how PearlPerfect V34 Whitening Strips deliver professional-grade whitening, at home, without sensitivity.
          </p>
        </div>
      </section>

      {/* The Science Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">
              🌟 The PearlPerfect Science
            </h2>
            <p className="text-lg text-gray-700">
              Our V34 strips are powered by an advanced whitening formula designed to lift deep surface stains safely, quickly, and comfortably.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-8 text-white mb-12">
            <h3 className="text-2xl font-bold mb-6">✨ What&apos;s inside the strips?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Stain-lifting active agents</strong> — targets discoloration from coffee, tea, wine, and more
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Hydrogen peroxide derivative</strong> — clinically tested, enamel-safe whitening ingredient
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Hydrogel layer</strong> — allows ingredients to stay in place and penetrate the enamel surface
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Sensitivity buffers</strong> — protect your teeth and gums from irritation
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Flavor & freshness layer</strong> — leaves your mouth feeling clean and minty after use
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Why it works (and why it&apos;s different)</h3>
            <p className="text-gray-700 mb-6">
              Most whitening products use either weak formulas that don&apos;t deliver real results, or harsh gels and trays that irritate your teeth.
            </p>
            <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
              <p className="text-lg font-semibold text-gray-900 mb-4">PearlPerfect V34 strips use a dual-action system:</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <strong>Lift + Bond</strong> — the whitening gel adheres to your teeth via a no-slip hydrogel base
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <strong>Break + Brighten</strong> — stains are chemically dissolved without abrasion, revealing a whiter natural enamel tone
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                All of this happens <strong>in just 14 minutes per session</strong>, no trays, no mess, and <strong>no sensitivity</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            🧪 The Whitening Process
          </h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Step 1: Apply</h3>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• Open the sachet and peel the strip from the backing.</li>
                    <li>• Apply to your upper and lower teeth, sticky side down.</li>
                    <li>• Gently press and fold over the edges.</li>
                  </ul>
                  <p className="text-sm text-gray-500 italic">⏱ Takes under 60 seconds.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">⏳ Step 2: Wait (14 Minutes)</h3>
                  <p className="text-gray-700 mb-4">While the strip is on:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• The <strong>active ingredients</strong> dissolve surface-level and deep-set stains.</li>
                    <li>• The <strong>hydrogel layer</strong> keeps the strip firmly in place — no sliding, no drooling.</li>
                    <li>• You can <strong>talk, scroll, or chill</strong> — it&apos;s barely noticeable.</li>
                  </ul>
                  <p className="text-sm text-gray-500 italic">🧪 We call this the &quot;Invisible Strip Effect&quot;.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🧊 Step 3: Remove + Rinse</h3>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• After 14 minutes, gently peel off both strips.</li>
                    <li>• Rinse your mouth with water or brush lightly.</li>
                    <li>• You&apos;ll feel instantly fresher — and see results even after 1 use.</li>
                  </ul>
                  <p className="text-sm text-gray-500 italic">✨ You may feel a slight &quot;squeaky clean&quot; sensation — that&apos;s the magic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            📈 When You&apos;ll See Results
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            Most users see visible improvement after just <strong>1–2 uses</strong>.
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Timeframe</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Day 1</td>
                    <td className="py-4 px-6 text-gray-700">Slight lift in brightness</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Day 3–5</td>
                    <td className="py-4 px-6 text-gray-700">Noticeable difference in selfies 🦷</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Day 7</td>
                    <td className="py-4 px-6 text-gray-700">Up to <strong>2 full shade improvement</strong></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Day 14</td>
                    <td className="py-4 px-6 text-gray-700">Camera-ready ✨ main character smile</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-6 text-white text-center">
            <p className="text-lg">
              🔬 Clinical testing shows up to <strong>4 shades lighter</strong> in 10–14 days with daily use.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            🛡️ Is It Safe?
          </h2>
          <p className="text-xl text-gray-700 text-center mb-8">
            Yes — 100%. PearlPerfect V34 is:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Enamel-safe</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Formulated for sensitive teeth</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Check className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Certified dentist-approved</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Made in GMP-certified labs</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700">
              No trays. No UV lights. No harsh bleaches. Just smart chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            🧬 What Makes PearlPerfect Different?
          </h2>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-purple-600">PearlPerfect V34</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Drugstore Strips</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">LED Kits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Enamel-safe formula</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                    <td className="py-4 px-6 text-center text-yellow-600">⚠️ Often harsh</td>
                    <td className="py-4 px-6 text-center text-yellow-600">⚠️ Overheats</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">No-slip hydrogel</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                    <td className="py-4 px-6 text-center text-red-600">❌ Slides around</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Works in 14 minutes</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                    <td className="py-4 px-6 text-center text-red-600">❌ Up to 60 mins</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Sensitivity-free</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                    <td className="py-4 px-6 text-center text-red-600">❌ Often causes it</td>
                    <td className="py-4 px-6 text-center text-red-600">❌</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Mess-free experience</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                    <td className="py-4 px-6 text-center text-red-600">❌ Sticky mess</td>
                    <td className="py-4 px-6 text-center text-red-600">❌ Gels required</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Results in 3–5 days</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                    <td className="py-4 px-6 text-center text-red-600">❌ Takes weeks</td>
                    <td className="py-4 px-6 text-center text-green-600">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Real Life Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-heading text-gray-900 mb-6">
            🪞 Designed for Your Real Life
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We built PearlPerfect V34 to fit into your actual routine. It&apos;s:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">👜</div>
              <h3 className="font-semibold text-gray-900 mb-2">Travel-friendly</h3>
              <p className="text-gray-700 text-sm">Sachets fit in your bag</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🪥</div>
              <h3 className="font-semibold text-gray-900 mb-2">No brushing needed</h3>
              <p className="text-gray-700 text-sm">Before use</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe to use while</h3>
              <p className="text-gray-700 text-sm">Scrolling, Zooming, or filming content</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Just 14 minutes</h3>
              <p className="text-gray-700 text-sm">Not 45 or 60</p>
            </div>
          </div>

          <p className="text-lg text-gray-700">
            No gels. No pens. No trays. No downtime. Just results.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-gray-900 text-center mb-12">
            💜 Real People, Real Results
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                &quot;I drink black coffee daily. I used these strips for 4 days and my friends noticed immediately. No pain at all!&quot;
              </blockquote>
              <cite className="text-sm text-gray-500">— Verified Review (Emily G.)</cite>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                &quot;I&apos;ve tried everything from LED trays to messy gels — this was easier and faster. My smile looks filtered in real life.&quot;
              </blockquote>
              <cite className="text-sm text-gray-500">— Verified Review (Josh T.)</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold font-heading mb-6">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who&apos;ve discovered the PearlPerfect difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get My Strips Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Try Shade Finder
            </button>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </PageLoader>
  );
}
