import type {
  PlaybookStatus,
  PlaybookStep,
  RehearsalStatus,
  Procedure,
  SavedPlaybook,
} from "@/components/field-guide/field-guide-data";

type PlaybookTextField =
  | "title"
  | "summary"
  | "objective"
  | "audience"
  | "rehearsalFocus"
  | "duration"
  | "cadence"
  | "location"
  | "notes";

type MetadataField =
  | "owner"
  | "changeSummary"
  | "reviewWindow"
  | "publishWindow"
  | "rehearsalWindow";

type StepField =
  | "label"
  | "detail"
  | "phase"
  | "owner"
  | "duration"
  | "expectedSignal"
  | "rehearsalTip";

type PlaybookEditorProps = {
  draftPlaybook: SavedPlaybook;
  onAddStep: () => void;
  onCheckpointsChange: (value: string) => void;
  onCreateNew: () => void;
  onListChange: (field: "tags" | "tools", value: string) => void;
  onMetadataFieldChange: (field: MetadataField, value: string) => void;
  onPublishPlaybook: () => void;
  onReviewersChange: (value: string) => void;
  onSaveDraft: () => void;
  onSelectProcedure: (procedureId: string) => void;
  onStatusChange: (status: PlaybookStatus) => void;
  onStepFieldChange: (stepId: string, field: StepField, value: string) => void;
  onStepRemove: (stepId: string) => void;
  onTextFieldChange: (field: PlaybookTextField, value: string) => void;
  onRehearsalStatusChange: (status: RehearsalStatus) => void;
  procedures: Procedure[];
  rehearsalStatuses: readonly RehearsalStatus[];
  statuses: readonly PlaybookStatus[];
};

function TextInput({
  id,
  label,
  onChange,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function TextAreaInput({
  id,
  label,
  onChange,
  rows = 4,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  rows?: number;
  value: string;
}) {
  return (
    <label className="space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        value={value}
      />
    </label>
  );
}

function SelectInput<T extends string>({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: T) => void;
  options: readonly T[];
  value: T;
}) {
  return (
    <label className="space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        id={id}
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function StepCard({
  index,
  onChange,
  onRemove,
  step,
}: {
  index: number;
  onChange: (field: StepField, value: string) => void;
  onRemove: () => void;
  step: PlaybookStep;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Step {index + 1}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950">
            {step.label}
          </h3>
        </div>
        <button
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
          onClick={onRemove}
          type="button"
        >
          Remove step
        </button>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <TextInput
          id={`step-${step.id}-label`}
          label={`Step ${index + 1} label`}
          onChange={(value) => onChange("label", value)}
          value={step.label}
        />
        <SelectInput
          id={`step-${step.id}-phase`}
          label={`Step ${index + 1} phase`}
          onChange={(value) => onChange("phase", value)}
          options={["Brief", "Execute", "Verify"]}
          value={step.phase}
        />
        <TextInput
          id={`step-${step.id}-owner`}
          label={`Step ${index + 1} owner`}
          onChange={(value) => onChange("owner", value)}
          value={step.owner}
        />
        <TextInput
          id={`step-${step.id}-duration`}
          label={`Step ${index + 1} duration`}
          onChange={(value) => onChange("duration", value)}
          value={step.duration}
        />
        <div className="lg:col-span-2">
          <TextAreaInput
            id={`step-${step.id}-detail`}
            label={`Step ${index + 1} detail`}
            onChange={(value) => onChange("detail", value)}
            rows={3}
            value={step.detail}
          />
        </div>
        <TextAreaInput
          id={`step-${step.id}-signal`}
          label={`Step ${index + 1} expected signal`}
          onChange={(value) => onChange("expectedSignal", value)}
          rows={3}
          value={step.expectedSignal}
        />
        <TextAreaInput
          id={`step-${step.id}-tip`}
          label={`Step ${index + 1} moderator tip`}
          onChange={(value) => onChange("rehearsalTip", value)}
          rows={3}
          value={step.rehearsalTip}
        />
      </div>
    </div>
  );
}

export default function PlaybookEditor({
  draftPlaybook,
  onAddStep,
  onCheckpointsChange,
  onCreateNew,
  onListChange,
  onMetadataFieldChange,
  onPublishPlaybook,
  onRehearsalStatusChange,
  onReviewersChange,
  onSaveDraft,
  onSelectProcedure,
  onStatusChange,
  onStepFieldChange,
  onStepRemove,
  onTextFieldChange,
  procedures,
  rehearsalStatuses,
  statuses,
}: PlaybookEditorProps) {
  return (
    <section className="space-y-6 rounded-[1.75rem] border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-slate-200/40">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Authoring studio
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Draft and rehearse custom playbooks
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Start from a procedure template or load a saved playbook, then edit
            metadata, reviewer context, and step choreography before saving the
            next version.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            onClick={onCreateNew}
            type="button"
          >
            Start new playbook
          </button>
          <button
            className="rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={onSaveDraft}
            type="button"
          >
            Save draft
          </button>
          <button
            className="rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm font-medium text-sky-950 transition hover:bg-sky-200"
            onClick={onPublishPlaybook}
            type="button"
          >
            Publish playbook
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="space-y-2" htmlFor="source-procedure">
          <span className="text-sm font-medium text-slate-700">
            Source procedure
          </span>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            id="source-procedure"
            onChange={(event) => onSelectProcedure(event.target.value)}
            value={draftPlaybook.sourceProcedureId}
          >
            {procedures.map((procedure) => (
              <option key={procedure.id} value={procedure.id}>
                {procedure.title}
              </option>
            ))}
          </select>
        </label>
        <SelectInput
          id="draft-status"
          label="Draft status"
          onChange={onStatusChange}
          options={statuses}
          value={draftPlaybook.status}
        />
        <SelectInput
          id="rehearsal-status"
          label="Rehearsal status"
          onChange={onRehearsalStatusChange}
          options={rehearsalStatuses}
          value={draftPlaybook.rehearsalStatus}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TextInput
          id="playbook-title"
          label="Playbook title"
          onChange={(value) => onTextFieldChange("title", value)}
          value={draftPlaybook.title}
        />
        <TextInput
          id="playbook-duration"
          label="Duration"
          onChange={(value) => onTextFieldChange("duration", value)}
          value={draftPlaybook.duration}
        />
        <div className="lg:col-span-2">
          <TextAreaInput
            id="playbook-summary"
            label="Playbook summary"
            onChange={(value) => onTextFieldChange("summary", value)}
            rows={3}
            value={draftPlaybook.summary}
          />
        </div>
        <TextAreaInput
          id="playbook-objective"
          label="Objective"
          onChange={(value) => onTextFieldChange("objective", value)}
          rows={3}
          value={draftPlaybook.objective}
        />
        <TextAreaInput
          id="playbook-audience"
          label="Audience"
          onChange={(value) => onTextFieldChange("audience", value)}
          rows={3}
          value={draftPlaybook.audience}
        />
        <TextAreaInput
          id="rehearsal-focus"
          label="Rehearsal focus"
          onChange={(value) => onTextFieldChange("rehearsalFocus", value)}
          rows={3}
          value={draftPlaybook.rehearsalFocus}
        />
        <TextAreaInput
          id="playbook-notes"
          label="Notes"
          onChange={(value) => onTextFieldChange("notes", value)}
          rows={3}
          value={draftPlaybook.notes}
        />
        <TextInput
          id="playbook-cadence"
          label="Cadence"
          onChange={(value) => onTextFieldChange("cadence", value)}
          value={draftPlaybook.cadence}
        />
        <TextInput
          id="playbook-location"
          label="Location"
          onChange={(value) => onTextFieldChange("location", value)}
          value={draftPlaybook.location}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TextInput
          id="draft-owner"
          label="Owner"
          onChange={(value) => onMetadataFieldChange("owner", value)}
          value={draftPlaybook.metadata.owner}
        />
        <TextInput
          id="reviewers"
          label="Reviewers"
          onChange={onReviewersChange}
          value={draftPlaybook.metadata.reviewers.join(", ")}
        />
        <TextAreaInput
          id="change-summary"
          label="Change summary"
          onChange={(value) => onMetadataFieldChange("changeSummary", value)}
          rows={3}
          value={draftPlaybook.metadata.changeSummary}
        />
        <TextInput
          id="review-window"
          label="Review window"
          onChange={(value) => onMetadataFieldChange("reviewWindow", value)}
          value={draftPlaybook.metadata.reviewWindow}
        />
        <TextInput
          id="publish-window"
          label="Publish window"
          onChange={(value) => onMetadataFieldChange("publishWindow", value)}
          value={draftPlaybook.metadata.publishWindow}
        />
        <TextInput
          id="rehearsal-window"
          label="Rehearsal window"
          onChange={(value) => onMetadataFieldChange("rehearsalWindow", value)}
          value={draftPlaybook.metadata.rehearsalWindow}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <TextAreaInput
          id="playbook-tags"
          label="Tags"
          onChange={(value) => onListChange("tags", value)}
          rows={4}
          value={draftPlaybook.tags.join(", ")}
        />
        <TextAreaInput
          id="playbook-tools"
          label="Tools"
          onChange={(value) => onListChange("tools", value)}
          rows={4}
          value={draftPlaybook.tools.join(", ")}
        />
        <TextAreaInput
          id="checkpoint-list"
          label="Checkpoint list"
          onChange={onCheckpointsChange}
          rows={4}
          value={draftPlaybook.checkpoints.join("\n")}
        />
      </div>

      <section className="space-y-4 rounded-[1.5rem] border border-slate-200/70 bg-slate-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Authored steps
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Each step carries phase, owner, timing, and moderator notes so the
              rehearsal preview can render the sequence coherently.
            </p>
          </div>
          <button
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
            onClick={onAddStep}
            type="button"
          >
            Add rehearsal step
          </button>
        </div>
        <div className="space-y-4">
          {draftPlaybook.steps.map((step, index) => (
            <StepCard
              index={index}
              key={step.id}
              onChange={(field, value) =>
                onStepFieldChange(step.id, field, value)
              }
              onRemove={() => onStepRemove(step.id)}
              step={step}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
