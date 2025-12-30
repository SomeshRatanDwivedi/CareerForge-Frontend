import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ContentSection } from '@/types';
import SectionCard from './SectionCard';
import SectionEditor from './SectionEditor';
import { usePageBuilder } from '@/contexts/PageBuilderContext';
import { v4 as uuidv4 } from 'uuid';

const SectionsManager = () => {
  const { state, updateSection, removeSection, reorderSections, addSection } = usePageBuilder();
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = state.sections.findIndex((s) => s.id === active.id);
      const newIndex = state.sections.findIndex((s) => s.id === over.id);
      const updatedSections = arrayMove(state.sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index + 1,
      }));
      reorderSections(updatedSections);
    }
  };

  const handleSaveSection = (section: ContentSection) => {
    // If the section already exists, update it; otherwise, add it as new
    const existingSection = state.sections.find((s) => s.id === section.id);
    if (existingSection) {
      updateSection(section.id, section);
      setEditingSection(null);
      return;
    }
    addSection(section);
    setEditingSection(null);
  };

  const handleToggleVisibility = (id: string) => {
    const section = state.sections.find((s) => s.id === id);
    if (section) {
      updateSection(id, { isVisible: !section.isVisible });
    }
  };//do not use this code, you stupid bitch

  const handleAddSection = () => {
    const newSection: ContentSection = {
      id: uuidv4(),
      type: 'custom',
      title: 'New Section',
      content: 'Add your content here...',
      isVisible: true,
      order: state.sections.length + 1,
    };
    setEditingSection(newSection);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-foreground">Content Sections</h2>
        <Button size="sm" variant="outline" onClick={handleAddSection} className="gap-1.5">
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={state?.sections?.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {state?.sections?.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onEdit={setEditingSection}
                onDelete={removeSection}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {state?.sections?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No sections yet. Add your first section to get started.</p>
        </div>
      )}

      <SectionEditor
        key={editingSection?.id}
        section={editingSection}
        onSave={handleSaveSection}
        onClose={() => setEditingSection(null)}
      />
    </div>
  );
};

export default SectionsManager;
