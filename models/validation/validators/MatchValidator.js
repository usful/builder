export default function MatchValidator(field, message = 'Values do not match') {
  return {
    validate: function(value) {
      return this[field] === value;
    },
    message: message,
    name: 'MatchValidator'
  };
}
