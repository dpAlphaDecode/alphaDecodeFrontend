// components/ui/card.js
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-md rounded-lg overflow-visible z-0 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className }) => {
    return (
      <div className={`p-2 border-b ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children, className }) => {
    return (
      <div className={`p-1 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardTitle = ({ children, className }) => {
    return (
      <h2 className={`text-xl font-semibold ${className}`}>
        {children}
      </h2>
    );
  };
  