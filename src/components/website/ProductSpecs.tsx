import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, HardDrive, MemoryStick, Zap, Thermometer, Wifi } from 'lucide-react';

const ProductSpecs = () => {
  const detailedSpecs = [
    {
      id: 'tiny-tim',
      name: 'Tiny TIM',
      price: '€299',
      processor: {
        model: 'Intel N97',
        cores: '4 cores, 4 threads',
        baseFreq: '1.5 GHz',
        boostFreq: '3.6 GHz',
        tdp: '12W'
      },
      memory: {
        base: '8GB LPDDR5',
        upgradable: 'Up to 32GB',
        speed: '4800 MHz'
      },
      storage: {
        base: '256GB NVMe M.2',
        type: 'PCIe 3.0',
        upgradable: 'Up to 2TB'
      },
      connectivity: [
        '2x USB 3.2 Type-A',
        '1x USB-C (Data + Power)',
        'Gigabit Ethernet',
        'Wi-Fi 6E',
        'Bluetooth 5.3'
      ],
      dimensions: '120 × 120 × 40mm',
      weight: '400g',
      powerConsumption: '6-12W',
      operatingTemp: '0°C to 40°C'
    },
    {
      id: 'just-tim',
      name: 'Just TIM',
      price: '€449',
      processor: {
        model: 'Intel N100',
        cores: '4 cores, 4 threads',
        baseFreq: '1.0 GHz',
        boostFreq: '3.4 GHz',
        tdp: '6W'
      },
      memory: {
        base: '16GB LPDDR5',
        upgradable: 'Up to 32GB',
        speed: '4800 MHz'
      },
      storage: {
        base: '500GB NVMe M.2',
        type: 'PCIe 3.0',
        upgradable: 'Up to 2TB'
      },
      connectivity: [
        '4x USB 3.2 Type-A',
        '2x USB-C (Data + Power)',
        'Gigabit Ethernet',
        'Wi-Fi 6E',
        'Bluetooth 5.3',
        'HDMI 2.1'
      ],
      dimensions: '140 × 140 × 45mm',
      weight: '550g',
      powerConsumption: '8-15W',
      operatingTemp: '0°C to 45°C'
    },
    {
      id: 'tim-pro',
      name: 'TIM Pro',
      price: '€699',
      processor: {
        model: 'Intel N200',
        cores: '4 cores, 4 threads',
        baseFreq: '1.0 GHz',
        boostFreq: '3.7 GHz',
        tdp: '6W'
      },
      memory: {
        base: '24GB (2×12GB) DDR5',
        upgradable: 'Not upgradable',
        speed: '4800 MHz'
      },
      storage: {
        base: '1TB NVMe M.2',
        type: 'PCIe 4.0',
        upgradable: 'Up to 2TB'
      },
      connectivity: [
        '4x USB 3.2 Type-A',
        '2x USB-C (Data + Power)',
        '2x Gigabit Ethernet',
        'Wi-Fi 6E',
        'Bluetooth 5.3',
        'HDMI 2.1',
        'DisplayPort 1.4'
      ],
      dimensions: '160 × 160 × 50mm',
      weight: '700g',
      powerConsumption: '12-20W',
      operatingTemp: '0°C to 50°C'
    },
    {
      id: 'tim-max',
      name: 'TIM Max',
      price: '€1299',
      processor: {
        model: 'AMD Ryzen 5 7520U',
        cores: '4 cores, 8 threads',
        baseFreq: '2.8 GHz',
        boostFreq: '4.3 GHz',
        tdp: '15-30W'
      },
      memory: {
        base: '64GB (2×32GB) DDR5',
        upgradable: 'Not upgradable',
        speed: '5600 MHz'
      },
      storage: {
        base: '2TB NVMe M.2',
        type: 'PCIe 4.0',
        upgradable: 'Second M.2 slot available'
      },
      connectivity: [
        '6x USB 3.2 Type-A',
        '2x USB-C/Thunderbolt 4',
        '2x Gigabit Ethernet',
        'Wi-Fi 6E',
        'Bluetooth 5.3',
        'HDMI 2.1',
        '2x DisplayPort 1.4',
        'External GPU support'
      ],
      dimensions: '200 × 200 × 60mm',
      weight: '1.2kg',
      powerConsumption: '25-45W',
      operatingTemp: '0°C to 55°C'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-foreground">Technical Specifications</h1>
        <p className="text-xl text-muted-foreground">
          Detailed hardware specifications for all TIM configurations
        </p>
      </div>

      <div className="space-y-12">
        {detailedSpecs.map((product) => (
          <Card key={product.id} className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {product.price}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Processor */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Processor</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span className="font-medium">{product.processor.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cores:</span>
                      <span className="font-medium">{product.processor.cores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Freq:</span>
                      <span className="font-medium">{product.processor.baseFreq}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Boost Freq:</span>
                      <span className="font-medium">{product.processor.boostFreq}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TDP:</span>
                      <span className="font-medium">{product.processor.tdp}</span>
                    </div>
                  </div>
                </div>

                {/* Memory */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MemoryStick className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Memory</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base:</span>
                      <span className="font-medium">{product.memory.base}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max:</span>
                      <span className="font-medium">{product.memory.upgradable}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="font-medium">{product.memory.speed}</span>
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Storage</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base:</span>
                      <span className="font-medium">{product.storage.base}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{product.storage.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max:</span>
                      <span className="font-medium">{product.storage.upgradable}</span>
                    </div>
                  </div>
                </div>

                {/* Connectivity */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Connectivity</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    {product.connectivity.map((item, index) => (
                      <div key={index} className="text-muted-foreground">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Physical</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-medium">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{product.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Op. Temp:</span>
                      <span className="font-medium">{product.operatingTemp}</span>
                    </div>
                  </div>
                </div>

                {/* Power */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Power</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consumption:</span>
                      <span className="font-medium">{product.powerConsumption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power Supply:</span>
                      <span className="font-medium">External adapter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Standby:</span>
                      <span className="font-medium">&lt; 2W</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecs;