export function Tag(props: any) {
  return (
    <div className="inline-block rounded-full px-3 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 font-semibold">
      {props.children}
    </div>
  );
}
