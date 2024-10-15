// const parseSalary = (salaryString: string): string => {
//   if (!salaryString || typeof salaryString !== 'string') {
//     return "Salary not provided";
//   }
  
//   const [range, period] = salaryString.split('/');
  
//   if (!range) {
//     return "Salary not provided";
//   }
  
//   const [min, max] = range.replace(/\$/g, '').split('-').map(s => parseInt(s.trim(), 10));
  
//   if (isNaN(min) || isNaN(max)) {
//     return salaryString; // Return the original string if parsing fails
//   }

//   return `$${min.toLocaleString()} - $${max.toLocaleString()} per ${period ? period : 'year'}`;
// };


export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  
  const timeDiff = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
  
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

