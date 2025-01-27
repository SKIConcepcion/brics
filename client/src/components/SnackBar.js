export default function SnackBar (props) {
    const { alertMessage, alertIcon } = props.field;
    return (
        <div className="fixed z-10000 top-20 right-6">
            <div className="max-w-s bg-blue-900 border border-gray-200 rounded-lg shadow-lg pr-5" role="alert">
                <div className="flex justify-center p-4">
                    <div className="flex-shrink-0">
                        {alertIcon && (
                            <div className="size-5 text-white">
                                {alertIcon}
                            </div>
                        )}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-left font-bold text-white">
                            {alertMessage}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
