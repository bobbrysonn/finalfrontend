export default function Description({ description }: { description: string }) {
  return (
    <div>
      <h4 className="font-semibold text-xl">Description</h4>
      <p className="text-[#333333] dark:text-muted-foreground text-sm">
        {description}
      </p>
    </div>
  )
}