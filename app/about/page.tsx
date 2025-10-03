'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { 
  Calendar, 
  User, 
  Building, 
  Award, 
  Users, 
  Target, 
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* About Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Calendar className="w-4 h-4 mr-2" />
              Established 1995
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-primary">Abuzar Industries</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three decades of excellence in timber supply, from humble beginnings to industry leadership
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Athaulla Afroz - Chairman & Founder */}
              <div className="text-center">
                <div className="w-72 h-96 relative overflow-hidden rounded-2xl mx-auto mb-6 shadow-xl border-4 border-white">
                  <Image
                    src="/images/afroz.jpg"
                    alt="Athaulla Afroz - Founder"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Athaulla Afroz</h3>
                <p className="text-primary font-semibold text-lg mb-4">Chairman & Founder (1995)</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded Abuzar Industries in 1995 after facing numerous struggles and challenges. 
                  With determination and vision, he built the company from ground up, establishing 
                  a reputation for quality timber supply in the construction industry.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Started in 1995
                </div>
              </div>

              {/* Transition Arrow - Hidden on mobile */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg mb-4">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-primary mb-1">Leadership</p>
                    <p className="text-xs text-gray-500">Transition</p>
                  </div>
                </div>
              </div>

              {/* Mohammed Afsar - Current Leader */}
              <div className="text-center">
                <div className="w-72 h-96 relative overflow-hidden rounded-2xl mx-auto mb-6 shadow-xl border-4 border-white">
                  <Image
                    src="/images/afsar.jpg"
                    alt="Mohammed Afsar - Current Owner"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mohammed Afsar</h3>
                <p className="text-accent font-semibold text-lg mb-4">Current Owner & Leader</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Son of Athaulla Afroz, now leading Abuzar Industries with modern approaches and 
                  continued excellence. Under his leadership, the company has expanded its reach 
                  and maintained the highest standards of timber quality and customer service.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-medium">
                  <Target className="w-4 h-4 mr-2" />
                  Leading Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Company Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">Principles that guide us since 1995</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Quality Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Three decades of commitment to providing the highest quality timber products
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Customer Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building lasting relationships through reliable service and honest business practices
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Embracing modern technology while maintaining traditional values of craftsmanship
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>  

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Three Decades of Excellence
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            From Athaulla Afroz's vision to Mohammed Afsar's leadership, we continue to serve with the same commitment to quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <a href="/calculator">Get Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="/contact">Contact Us</a>
            </Button>
        </div>
        </div>
      </section>
      </div>
  );
}