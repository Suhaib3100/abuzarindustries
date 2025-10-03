'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calculator, Download, Send, FileSpreadsheet, Plus, Minus, Trash2 } from 'lucide-react';

interface TimberItem {
  id: string;
  type: string;
  length: number;
  width: number;
  thickness: number;
  quantity: number;
  pricePerCubicFoot: number;
  totalPrice: number;
}

const timberTypes = [
  { name: 'Teak Wood', price: 4000, color: 'bg-amber-100 text-amber-800' },
  { name: 'White Teak', price: 2800, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Neem Wood', price: 1500, color: 'bg-green-100 text-green-800' },
];

export default function CalculatorPage() {
  const [items, setItems] = useState<TimberItem[]>([
    {
      id: '1',
      type: 'Teak Wood',
      length: 8,
      width: 6,
      thickness: 2,
      quantity: 10,
      pricePerCubicFoot: 4000,
      totalPrice: 0,
    }
  ]);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    project: '',
  });

  const calculateTotal = (item: TimberItem) => {
    const cubicFeet = (item.length * item.width * item.thickness) / 144; // Convert to cubic feet
    return cubicFeet * item.quantity * item.pricePerCubicFoot;
  };

  const updateItem = (id: string, field: keyof TimberItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'type') {
          const timberType = timberTypes.find(t => t.name === value);
          updatedItem.pricePerCubicFoot = timberType?.price || 0;
        }
        updatedItem.totalPrice = calculateTotal(updatedItem);
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    const newItem: TimberItem = {
      id: Date.now().toString(),
      type: 'Teak Wood',
      length: 8,
      width: 6,
      thickness: 2,
      quantity: 1,
      pricePerCubicFoot: 4000,
      totalPrice: 0,
    };
    newItem.totalPrice = calculateTotal(newItem);
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const generateQuote = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create formatted message for WhatsApp
    const formatWhatsAppMessage = () => {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      
      let message = `🏗️ *TIMBER QUOTE REQUEST* 🏗️\n\n`;
      message += `📅 *Date:* ${date} at ${time}\n\n`;
      
      // Customer Information
      message += `👤 *CUSTOMER DETAILS:*\n`;
      message += `• Name: ${customerInfo.name}\n`;
      message += `• Email: ${customerInfo.email}\n`;
      message += `• Phone: ${customerInfo.phone}\n`;
      message += `• Project: ${customerInfo.project || 'Not specified'}\n`;
      message += `• Address: ${customerInfo.address}\n\n`;
      
      // Timber Items Table
      message += `📋 *TIMBER REQUIREMENTS:*\n`;
      message += `┌─────────────────┬────────┬───────┬──────────┬──────────┬─────────┬─────────────┐\n`;
      message += `│ Timber Type     │ Length │ Width │ Thickness│ Quantity │ Price   │ Total (₹)   │\n`;
      message += `├─────────────────┼────────┼───────┼──────────┼──────────┼─────────┼─────────────┤\n`;
      
      items.forEach(item => {
        const type = item.type.padEnd(15);
        const length = item.length.toString().padStart(6);
        const width = item.width.toString().padStart(5);
        const thickness = item.thickness.toString().padStart(8);
        const quantity = item.quantity.toString().padStart(8);
        const price = `₹${item.pricePerCubicFoot}`.padStart(7);
        const total = `₹${item.totalPrice.toLocaleString()}`.padStart(11);
        
        message += `│ ${type} │ ${length}ft │ ${width}" │ ${thickness}" │ ${quantity} │ ${price} │ ${total} │\n`;
      });
      
      message += `└─────────────────┴────────┴───────┴──────────┴──────────┴─────────┴─────────────┘\n\n`;
      
      // Summary
      message += `💰 *QUOTE SUMMARY:*\n`;
      message += `• Total Items: ${items.length}\n`;
      message += `• Grand Total: *₹${grandTotal.toLocaleString()}*\n\n`;
      
      // Additional Information
      message += `📝 *ADDITIONAL NOTES:*\n`;
      message += `• Prices are per cubic foot\n`;
      message += `• Delivery charges may apply\n`;
      message += `• Quote valid for 7 days\n`;
      message += `• Custom sizes available\n\n`;
      
      message += `Please confirm this quote and let us know your preferred delivery date. We'll contact you shortly to finalize the order.\n\n`;
      message += `Thank you for choosing Abuzar Industries! 🌟`;
      
      return message;
    };

    const whatsappMessage = formatWhatsAppMessage();
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919845378626?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Timber Price Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate timber costs instantly with our professional calculator. Get accurate quotes for your construction needs.
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="quote" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Generate Quote
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Timber Types Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  Current Timber Prices
                </CardTitle>
                <CardDescription>
                  Base prices per cubic foot (rates may vary based on quality and availability)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timberTypes.map((timber) => (
                    <div key={timber.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{timber.name}</h3>
                        <p className="text-sm text-gray-600">Premium Quality</p>
                      </div>
                      <Badge className={timber.color}>
                        ₹{timber.price}/cft
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Calculator Table */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Timber Calculation Sheet</CardTitle>
                    <CardDescription>
                      Add your timber requirements and get instant pricing
                    </CardDescription>
                  </div>
                  <Button onClick={addItem} className="flex items-center gap-2 w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    Add Row
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-3 font-semibold text-gray-700">Timber Type</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Length (ft)</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Width (in)</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Thickness (in)</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Quantity</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Price/cft</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Total (₹)</th>
                        <th className="text-left p-3 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">
                            <select
                              value={item.type}
                              onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              {timberTypes.map((timber) => (
                                <option key={timber.name} value={timber.name}>
                                  {timber.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={item.length}
                              onChange={(e) => updateItem(item.id, 'length', parseFloat(e.target.value) || 0)}
                              className="w-20"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={item.width}
                              onChange={(e) => updateItem(item.id, 'width', parseFloat(e.target.value) || 0)}
                              className="w-20"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={item.thickness}
                              onChange={(e) => updateItem(item.id, 'thickness', parseFloat(e.target.value) || 0)}
                              className="w-20"
                              min="0"
                              step="0.1"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              className="w-20"
                              min="1"
                            />
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-sm">₹{item.pricePerCubicFoot}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-mono font-semibold text-primary">
                              ₹{item.totalPrice.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1 mr-3">
                          <Label className="text-xs text-gray-600 mb-2 block">Timber Type</Label>
                          <select
                            value={item.type}
                            onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          >
                            {timberTypes.map((timber) => (
                              <option key={timber.name} value={timber.name}>
                                {timber.name} - ₹{timber.price}/cft
                              </option>
                            ))}
                          </select>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <Label className="text-xs text-gray-600">Length (ft)</Label>
                          <Input
                            type="number"
                            value={item.length}
                            onChange={(e) => updateItem(item.id, 'length', parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Width (in)</Label>
                          <Input
                            type="number"
                            value={item.width}
                            onChange={(e) => updateItem(item.id, 'width', parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Thickness (in)</Label>
                          <Input
                            type="number"
                            value={item.thickness}
                            onChange={(e) => updateItem(item.id, 'thickness', parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                            step="0.1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Quantity</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full"
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">Price per cft</p>
                          <p className="font-mono text-sm">₹{item.pricePerCubicFoot}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="font-mono font-semibold text-primary text-lg">
                            ₹{item.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Grand Total</h3>
                      <p className="text-sm text-gray-600">Including all timber requirements</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        ₹{grandTotal.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {items.length} item{items.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quote" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>
                  Provide your details to generate a professional quote
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="Enter your email"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="Enter your phone number"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="project">Project Type</Label>
                    <Input
                      id="project"
                      value={customerInfo.project}
                      onChange={(e) => setCustomerInfo({...customerInfo, project: e.target.value})}
                      placeholder="e.g., Residential, Commercial"
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    placeholder="Enter complete delivery address"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quote Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Quote Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.type}</h4>
                        <p className="text-sm text-gray-600">
                          {item.length}ft × {item.width}" × {item.thickness}" × {item.quantity} pcs
                        </p>
                      </div>
                      <span className="font-mono font-semibold">₹{item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Quote
              </Button>
              <Button
                size="lg"
                onClick={generateQuote}
                className="flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent"
                disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
              >
                <Send className="w-5 h-5" />
                Send Quote Request
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}