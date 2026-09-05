import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, DollarSign, Calendar, User } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  company: string;
  amount: number;
  stage: string;
  owner: string;
  dueDate: string;
}

const STAGES = ['Lead', 'Demo', 'Close'];

const SAMPLE_DEALS: Deal[] = [
  { id: '1', title: 'Enterprise Package', company: 'TechCorp', amount: 50000, stage: 'Lead', owner: 'Sarah', dueDate: '2026-10-15' },
  { id: '2', title: 'Starter Plan', company: 'StartupXYZ', amount: 5000, stage: 'Lead', owner: 'John', dueDate: '2026-09-20' },
  { id: '3', title: 'Pro Tier Upgrade', company: 'CloudNine', amount: 25000, stage: 'Demo', owner: 'Sarah', dueDate: '2026-09-25' },
  { id: '4', title: 'Custom Integration', company: 'DataFlow Inc', amount: 75000, stage: 'Demo', owner: 'Mike', dueDate: '2026-10-01' },
  { id: '5', title: 'Annual Contract', company: 'GlobalTech', amount: 120000, stage: 'Close', owner: 'John', dueDate: '2026-09-10' },
];

const Index = () => {
  const [deals, setDeals] = useState<Deal[]>(SAMPLE_DEALS);

  const getDealsByStage = (stage: string) => deals.filter(d => d.stage === stage);

  const removeDeal = (id: string) => {
    setDeals(deals.filter(d => d.id !== id));
  };

  const moveDeal = (id: string, newStage: string) => {
    setDeals(deals.map(d => d.id === id ? { ...d, stage: newStage } : d));
  };

  const stageColors = {
    Lead: 'bg-blue-50 border-blue-200',
    Demo: 'bg-purple-50 border-purple-200',
    Close: 'bg-green-50 border-green-200',
  };

  const stageBadgeColors = {
    Lead: 'bg-blue-100 text-blue-800',
    Demo: 'bg-purple-100 text-purple-800',
    Close: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Deal Tracker</h1>
          <p className="text-muted-foreground">Osmako Track - Sales Pipeline</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAGES.map(stage => (
            <div key={stage} className="flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-foreground mb-1">{stage}</h2>
                <p className="text-sm text-muted-foreground">
                  {getDealsByStage(stage).length} deal{getDealsByStage(stage).length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className={`flex-1 rounded-lg border-2 p-4 space-y-3 ${stageColors[stage as keyof typeof stageColors]}`}>
                {getDealsByStage(stage).map(deal => (
                  <Card key={deal.id} className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground text-sm flex-1">{deal.title}</h3>
                        <button
                          onClick={() => removeDeal(deal.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">{deal.company}</p>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} className="text-accent" />
                          <span className="font-semibold text-foreground">${deal.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{new Date(deal.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{deal.owner}</span>
                        </div>
                      </div>

                      <Badge className={`${stageBadgeColors[stage as keyof typeof stageBadgeColors]} text-xs mb-3`}>
                        {stage}
                      </Badge>

                      <div className="flex gap-1 flex-wrap">
                        {STAGES.map(s => (
                          s !== stage && (
                            <Button
                              key={s}
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() => moveDeal(deal.id, s)}
                            >
                              → {s}
                            </Button>
                          )
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getDealsByStage(stage).length === 0 && (
                  <div className="text-center py-8">
                    <Plus size={24} className="mx-auto text-muted-foreground mb-2 opacity-50" />
                    <p className="text-sm text-muted-foreground">No deals yet</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Total Pipeline:</strong> ${deals.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
